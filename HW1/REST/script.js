var request = require('request');
var fs = require("fs");
var Promise = require('bluebird');
var parse = require('parse-link-header');


////// FILL IN THE BLANKS

var token = "token " + "7303a4b94e5acece5190cc04706515aa515ce66c";
var userId = "ssreeni";

var userId2 = "nramesh2";

var urlRoot = "https://github.ncsu.edu/api/v3";
// NCSU Enterprise endpoint:
// https://github.ncsu.edu/api/v3

 //getYourRepos(userId);

var repo = "HW0";


// 
// listBranches(userId,repo);

// createRepository();

// createIssue(userId,repo);

// editWiki(userId,repo);


checkCollaborator(userId,repo);


function getYourRepos(userName)
{

	var options = {
		url: urlRoot + '/users/' + userName + "/repos",
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	console.log(options);

	// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error, response, body) 
	{
		console.log(body);
		var obj = JSON.parse(body);
		// console.log( obj );
		for( var i = 0; i < obj.length; i++ )
		{
			var name = obj[i].name;
			// console.log( name );
		}
	});

}

function listBranches(owner,repo)
{
	var options = {
		url: urlRoot + '/repos/' + owner + "/"+repo+"/branches",
		method: 'GET',
		headers: {
			"User-Agent":"EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}	
	};
	
	request(options, function (error, response, body)
        {
                var obj = JSON.parse(body);
                console.log( obj );
                for( var i = 0; i < obj.length; i++ )
                {
                        var name = obj[i].name;
                        console.log( name );
                }
        });	
}

function createRepository()
{
	var options = {
		url: urlRoot + "/user/repos",
		method: 'POST',
		headers: {
			"User-Agent":"EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		},
		body: '{"name": "ssreeni_newRepo"}',
	};
	
	request(options, function (error, response, body)
        {
                var obj = JSON.parse(body);
                console.log( obj );
                for( var i = 0; i < obj.length; i++ )
                {
                        var name = obj[i].name;
                        console.log( name );
                }
        });	
}

function createIssue(owner,repo)
{
	var options = {
		url: urlRoot + '/repos/' + owner + "/"+repo+"/issues",
		method: 'POST',
		headers: {
			"User-Agent":"EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		},
		body: '{"title": "ssreeni_Issue"}'	
	};
	
	request(options, function (error, response, body)
        {
                var obj = JSON.parse(body);
                console.log( obj );
                for( var i = 0; i < obj.length; i++ )
                {
                        var name = obj[i].name;
                        console.log( name );
                }
        });	

}
function editWiki(owner,repo)
{
	var options = {
		url: urlRoot + '/repos/' + owner + "/"+repo,
		method: 'PATCH',
		headers: {
			"User-Agent":"EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		},
		body: '{"name": "HW0", "has_wiki":"true"}'	
	};
	
	request(options, function (error, response, body)
        {
                var obj = JSON.parse(body);
                console.log( obj );
                for( var i = 0; i < obj.length; i++ )
                {
                        var name = obj[i].name;
                        console.log( name );
                }
        });	

}

function checkCollaborator(owner,repo) {

	var options = {
		url: urlRoot + '/repos/' + owner + "/"+repo+"/collaborators/"+userId2,
		method: 'GET',
		headers: {
			"User-Agent":"EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	console.log(options);

	request(options, function (error, response, body)
        {
        		// console.log(response);
        		// console.log("Below body")
          //       var obj = JSON.parse(body);
          //       console.log( obj );
          //       console.log("Printing OBJ")
          //       for( var i = 0; i < obj.length; i++ )
          //       {
          //               var name = obj[i].name;
          //               console.log( name );
          //       }

          	// console.log(response);
          	if (body != '') {
          		addCollaborator(owner,repo);
          	}
        });	

}

function addCollaborator(owner,repo) {

	var options = {
		url: urlRoot + '/repos/' + owner + "/"+repo+"/collaborators/"+userId2,
		method: 'PUT',
		permission: 'admin',
		headers: {
			"User-Agent":"EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	console.log(options);

	request(options, function (error, response, body)
        {
        	console.log(response);
        	console.log("You have been added as a Collaborator");
          	
        });	

	console.log("Should Add Collaborator Here");
}

