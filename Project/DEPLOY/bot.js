require('dotenv').config()
var Botkit = require('botkit');
var fs = require('fs');
var configureStack = require('./configureStack.js');
var grantdb =require('./grantdb.js');

var request = require('request');
var Promise = require('bluebird');
var parse = require('parse-link-header');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://localhost:27017/local';

var data;
var teamList;
var stackList;
var owner;
var urlRoot;

var getData = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('data');
  // Find some documents
  collection.find({}, {_id: 0}).toArray(function(err, docs) {
    assert.equal(err, null);
    data = docs[0];
    teamList = data.teamlist;
    stackList = data.stacklist;
    owner = data.github_details[0].owner;
    urlRoot = data.github_details[0].urlRoot;
    callback(docs);
  });
}

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
    getData(db, function() {
      db.close();
    });
});

var githubtoken = "token " + process.env.GITHUB_TOKEN;

var controller = Botkit.slackbot({
    debug: false
        //include "log: false" to disable logging
        //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
    token: process.env.TOKEN_SLACK,
}).startRTM()

var username;
var email;

controller.hears(['hi', 'hello'], ['direct_message'], function(bot, message) {
    bot.api.users.info({
        user: message.user
    }, (error, response) => {
        username = response.user.name;
        email = response.user.profile.email;
        bot.reply(message, 'Hi @' + username + '\n I will be helping you with the onboarding process today.' +
            'Please let me know what you would like to start off with.\n' +
            'Your options are: Software,Database,Github');
    });
});

controller.hears('slack', 'direct_message', function(bot, message) {
    bot.startConversation(message, function(err, convo) {

        convo.say('So you would like to get an invite to a Slack Channel!');
        convo.ask('Please enter the name of the team you would like to join', function(response, convo) {
            var teamPosition = teamList.indexOf(response.text.toUpperCase());
            if (teamPosition > -1) {
                sendSlackInvite(response, convo, teamPosition);
                convo.next();
            } else {
                invalidTeamPath(response, convo);
                convo.next();
            }
        });

        convo.next();

        function sendSlackInvite(response, convo, teamPosition) {
            var team = response.text;
            convo.ask('So you would like to join Team ' + team + '? Please confirm to proceed', [{
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    var channelName = data.team[teamPosition].channel;
                    convo.say('You have been sent an invite to the slack channel ' + channelName + ' for team ' + team + ' Please check your email.');
                    convo.next();
                }
            }, {
                pattern: bot.utterances.no,
                callback: function(response, convo) {
                    convo.say('I am canceling the current request');
                    convo.next();
                }
            }, {
                default: true,
                callback: function(response, convo) {
                    convo.say('Please enter yes or no');
                    convo.repeat();
                    convo.next();
                }
            }]);
        }

        function invalidTeamPath(response, convo) {
            convo.say(response.text + " is an invalid team. Please enter a valid team Name");
            convo.say("List of valid team names is " + teamList);
            convo.repeat();
            convo.next();
        }
    });
});

controller.hears('github', 'direct_message', function(bot, message) {
    bot.startConversation(message, function(err, convo) {

        convo.say('Interested in starting collaboration on one of our awesome projects?!');
        convo.ask('Please enter the name of your team.', function(response, convo) {
            var teamPosition = teamList.indexOf(response.text.toUpperCase());
            if (teamPosition > -1) {
                addGithubCollaborator(response, convo, teamPosition);
                convo.next();
            } else {
                invalidTeamPath(response, convo);
                convo.next();
            }
        });

        convo.next();

        function addGithubCollaborator(response, convo, teamPosition) {
            var team = response.text;
            var repositories = data.team[teamPosition].repositories;
            convo.say('As a part of team ' + team + ' You have access to the repositories ' + repositories);
            convo.ask('Please enter which repository you would like to get added to as a collaborator.', function(response, convo) {
                var repository = response.text;
                convo.next();
                if (repositories.indexOf(repository.toLowerCase()) > -1) {
                    convo.ask('So you want to get added as a collaborator to the repository ' + repository + '. Please confirm.', [{
                            pattern: bot.utterances.yes,
                            callback: function(response, convo) {
                                //repository collaborator addition code
                                repo = repository;
                                checkCollaborator(owner, repo, convo);
                                convo.next();
                                //checkForMoreRequests(convo);
                            }
                        },

                        {
                            pattern: bot.utterances.no,
                            callback: function(response, convo) {
                                convo.say('I am canceling the current request');
                                //checkForMoreRequests(convo);
                                convo.next();
                            }
                        },

                        {
                            default: true,
                            callback: function(response, convo) {
                                convo.say('Please enter yes or no');
                                convo.repeat();
                                convo.next();
                            }
                        }
                    ]);
                } else {
                    convo.say(repository + " is an invalid repository name. Please enter a valid repository");
                    convo.say("List of valid repositories is " + repositories);
                    convo.repeat();
                    convo.next();
                }
            });

        }
    });
});

controller.hears('mailing list', 'direct_message', function(bot, message) {
    bot.startConversation(message, function(err, convo) {

        convo.say('Keep up-to date with the latest news by getting added to your teams mailing list.');
        convo.ask('Please enter the name of your team and we will add you to the mailing list', function(response, convo) {
            var teamPosition = teamList.indexOf(response.text.toUpperCase());
            if (teamPosition > -1) {
                addToMailingList(response, convo, teamPosition);
                convo.next();
            } else {
                invalidTeamPath(response, convo);
                convo.next();
            }
            convo.next();
        });

        convo.next();

        function addToMailingList(response, convo, teamPosition) {
            var team = response.text;
            convo.ask('So you would like to get added to the mailing list for team ' + team + '? Please confirm to proceed', [{
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    var mailingList = data.team[teamPosition].mailinglist;
                    convo.say('You have been successfully added to the mailing list ' + mailingList + ' for team ' + team + ' Please check your email for confirmation');
                    convo.next();
                    //checkForMoreRequests(convo);
                }
            }, {
                pattern: bot.utterances.no,
                callback: function(response, convo) {
                    convo.say('I am canceling the current request');
                    //checkForMoreRequests(convo);
                    convo.next();
                }
            }, {
                default: true,
                callback: function(response, convo) {
                    convo.say('Please enter yes or no');
                    convo.repeat();
                    convo.next();
                }
            }]);

        }
    });
});


controller.hears('database', 'direct_message', function(bot, message) {
    bot.startConversation(message, function(err, convo) {

        convo.say('So, you want to be provided accesses to our databases?');
        convo.ask('Please enter the name of your team.', function(response, convo) {
            var teamPosition = teamList.indexOf(response.text.toUpperCase());
            if (teamPosition > -1) {
                addToDatabase(response, convo, teamPosition);
                convo.next();
            } else {
                invalidTeamPath(response, convo);
                convo.next();
            }
            convo.next();
        });

        convo.next();

        function addToDatabase(response, convo, teamPosition) {
            var team = response.text;
            var databases = data.team[teamPosition].database;
            convo.say('As a part of team ' + team + ' You have access to the databases ' + databases);
            convo.ask('Please enter which databases you would like to be provided access to.', function(response, convo) {
                var database = response.text;
                convo.next();
                if (databases.indexOf(database.toLowerCase()) > -1) {
                    convo.ask('So you want access to the database ' + database + '. Please confirm.', [{
                            pattern: bot.utterances.yes,
                            callback: function(response, convo) {
                                convo.say('You have been given access to the database ' + database);
                                convo.say('You can access it with Username = '+ username+' and Password = 12345');
                                grantdb.updateInventory(username,database);
                                convo.next();
                                //checkForMoreRequests(convo);
                            }
                        },

                        {
                            pattern: bot.utterances.no,
                            callback: function(response, convo) {
                                convo.say('I am canceling the current request');
                                //checkForMoreRequests(convo);
                                convo.next();
                            }
                        },

                        {
                            default: true,
                            callback: function(response, convo) {
                                convo.say('Please enter yes or no');
                                convo.repeat();
                                convo.next();
                            }
                        }
                    ]);
                } else {
                    convo.say(database + " is an invalid database name. Please enter a valid database");
                    convo.say("List of valid databases is " + databases);
                    convo.repeat();
                    convo.next();
                }
            });

        }
    });
});


controller.hears('software', 'direct_message', function(bot, message) {
bot.startConversation(message, function(err, convo) {

        convo.say('Need to configure a new development environment?');
        convo.say('We currently support the following stacks ' + stackList);
        convo.ask('Please enter the name of the stack you wish to configure.', function(response, convo) {
            var stackPosition = stackList.indexOf(response.text.toLowerCase());
            if (stackPosition > -1) {
                configureEnvironment(response, convo, stackPosition);
                convo.next();
            } else {
                invalidStackPath(response, convo);
                convo.next();
            }
            convo.next();
        });

        convo.next();

        function configureEnvironment(response, convo, stackPosition) {
            var stack = response.text;
            convo.ask('So you to wish the configure a new development environment with the ' + stack + ' stack. Please confirm.', [{
                    pattern: bot.utterances.yes,
                    callback: function(response, convo) {
                        configureStack.configure(stack, username, email);
                        convo.say('Stack is currently being configured. I will email the details of the environment on '+ email + ' once it has been completed.');
                        convo.next();
                    }
                },

                {
                    pattern: bot.utterances.no,
                    callback: function(response, convo) {
                        convo.say('I am canceling the current request');
                        convo.next();
                    }
                },

                {
                    default: true,
                    callback: function(response, convo) {
                        convo.say('Please enter yes or no');
                        convo.repeat();
                        convo.next();
                    }
                }
            ]);
        }
    });
})

function invalidTeamPath(response, convo) {
    convo.say(response.text + " is an invalid team. Please enter a valid team Name");
    convo.say("List of valid team names is " + teamList);
    convo.repeat();
    convo.next();
}

function invalidStackPath(response, convo) {
    convo.say("Sorry we currently do not support this development stack");
    convo.say("List of supported development stacks is " + stackList);
    convo.repeat();
    convo.next();
}

function checkCollaborator(owner,repo, convo) {

    var options = {
        url: urlRoot + '/repos/' + owner + "/"+repo+"/collaborators/"+username,
        method: 'GET',
        headers: {
            "User-Agent":"EnableIssues",
            "content-type": "application/json",
            "Authorization": githubtoken
        }
    };

    request(options, function (error, response, body)
        {
            if (body != '') {
                convo.say('You have been added as an collaborator for the repository ' + repo);
                addCollaborator(owner,repo, convo);
                convo.next();
            }
            else {
                convo.say("You are a collaborator for this repository already. Please continue");
                convo.next();
            }
        }); 

}

function addCollaborator(owner,repo, convo) {

    var options = {
        url: urlRoot + '/repos/' + owner + "/"+repo+"/collaborators/"+username,
        method: 'PUT',
        permission: 'admin',
        headers: {
            "User-Agent":"EnableIssues",
            "content-type": "application/json",
            "Authorization": githubtoken
        }
    };  

    request(options, function (error, response, body) {
        }); 
}
