var Botkit = require('botkit');
var fs = require('fs');

var request = require('request');
var fs = require("fs");
var Promise = require('bluebird');
var parse = require('parse-link-header');

var contents = fs.readFileSync("mockdata.json");

var mockData = JSON.parse(contents);
var teamList = mockData.teamlist;
var userList = mockData.user;

var owner = "ssreeni";
var urlRoot = "https://github.ncsu.edu/api/v3";

// Token for github repo
// var githubtoken =  process.env.GITHUBTOKEN;
var githubtoken = "token " + "7303a4b94e5acece5190cc04706515aa515ce66c";


var controller = Botkit.slackbot({
    debug: false
        //include "log: false" to disable logging
        //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
    token: process.env.ALTCODETOKEN,
}).startRTM()

var username;

controller.hears(['hi', 'hello'], ['direct_message'], function(bot, message) {
    bot.api.users.info({
        user: message.user
    }, (error, response) => {
        username = response.user.name;
        bot.reply(message, 'Hi @' + username + '\n I will be helping you with the onboarding process today.' +
            'Please let me know what you would like to start off with.\n' +
            'If you want to know your options, please feel free to ask for help');
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
                    var channelName = mockData.team[teamPosition].channel;
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

        convo.say('Intested in starting collaboration on one of our awesome projects?!');
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
            var repositories = mockData.team[teamPosition].repositories;
            convo.say('As a part of team ' + team + ' You have access to the repositories ' + repositories);
            convo.ask('Please enter which repository you would like to get added to as a collaborator.', function(response, convo) {
                var repository = response.text;
                convo.next();
                if (repositories.indexOf(repository.toLowerCase()) > -1) {
                    convo.ask('So you want to get added as a collaborator to the repository ' + repository + '. Please confirm.', [{
                            pattern: bot.utterances.yes,
                            callback: function(response, convo) {
                                repo = repository;
                                checkCollaborator(owner, repo, convo);

                                convo.say('You have been added as an collaborator for the repository ' + repository);
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
                    var mailingList = mockData.team[teamPosition].mailinglist;
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
            var databases = mockData.team[teamPosition].database;
            convo.say('As a part of team ' + team + ' You have access to the databases ' + databases);
            convo.ask('Please enter which databases you would like to be provided access to.', function(response, convo) {
                var database = response.text;
                convo.next();
                if (databases.indexOf(database.toLowerCase()) > -1) {
                    convo.ask('So you want access to the database ' + database + '. Please confirm.', [{
                            pattern: bot.utterances.yes,
                            callback: function(response, convo) {
                                convo.say('You have been given access to the database ' + database);
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


controller.hears('[software,package]', 'direct_message', function(bot, message) {
    bot.startConversation(message, function(err, convo) {

        convo.say('Need to install software on your development environment?');
        convo.ask('Please enter the name of your team.', function(response, convo) {
            var teamPosition = teamList.indexOf(response.text.toUpperCase());
            if (teamPosition > -1) {
                installSoftware(response, convo, teamPosition);
                convo.next();
            } else {
                invalidTeamPath(response, convo);
                convo.next();
            }
            convo.next();
        });

        convo.next();

        function installSoftware(response, convo, teamPosition) {
            var team = response.text;
            var softwares = mockData.team[teamPosition].softwares;
            var ipAddress;

            for (var i=0; i<userList.length; i++) {
                if (userList[i].name === username) {
                    ipAddress = userList[i].ipaddress;
                }
            }

            convo.say('As a part of team ' + team + ' You may need the following list of softwares/packages: ' + softwares);
            convo.ask('Please enter which softwares/packages you would like installed on your dev environment', function(response, convo) {
                var software = response.text;
                convo.next();
                if (softwares.indexOf(software) > -1) {
                    convo.ask('So you to install the software/package ' + software + '. Please confirm.', [{
                            pattern: bot.utterances.yes,
                            callback: function(response, convo) {
                                convo.say('Software/Package '+ software+ ' has been installed on your development environment ' + ipAddress);
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
                    convo.say("Installation of " + software + " is not yet supported by me.");
                    convo.say("List of supported softwares/packages " + softwares);
                    convo.repeat();
                    convo.next();
                }
            });

        }
    });
});

function invalidTeamPath(response, convo) {
    convo.say(response.text + " is an invalid team. Please enter a valid team Name");
    convo.say("List of valid team names is " + teamList);
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

    // console.log(options);

    request(options, function (error, response, body)
        {
        
            // console.log(response);
            if (body != '') {
                addCollaborator(owner,repo);
            }
            else {
                convo.say(response.text + " You are a collaborator for this team already. Please continue");
                // convo.say("List of valid team names is " + teamList);
                convo.repeat();
                convo.next();
            }
        }); 

}

function addCollaborator(owner,repo) {

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

    console.log(options);

    request(options, function (error, response, body)
        {
            console.log(response);
            console.log("You have been added as a Collaborator");
            console.log(githubtoken);
        }); 

    console.log("Should Add Collaborator Here");
}
