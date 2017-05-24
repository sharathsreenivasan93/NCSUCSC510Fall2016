require('dotenv').config()
var needle = require('needle');
var os = require('os');
var fs = require('fs');
var Ansible = require('node-ansible');

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://localhost:27017/local';

var data;

var getData = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('data');
  // Find some documents
  collection.find({}, {_id: 0}).toArray(function(err, docs) {
    assert.equal(err, null);
    data = docs[0];
    callback(docs);
  });
}

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
    getData(db, function() {
      db.close();
    });
});

module.exports = {
    updateInventory: function(username, dbname) {

        var ipAddress = data.database_details[0].ipAddress;
        var pwd = data.database_details[0].pwd;
        var inventoryContent = '[instances]\n' + ipAddress + ' ansible_ssh_host=' + ipAddress + ' ansible_ssh_user=root database_username=' + username + ' database_password=' + pwd + ' database_name=' + dbname + '\n';
        fs.writeFile('./ansible/inventory_' + username + '_database', inventoryContent, function(err) {
            if (err) {
                return console.log(err);
            } else {
                runPlaybook(username, pwd, dbname);
            }
        });
    }
}

function runPlaybook(username, pwd, dbname) {
    var playbook = new Ansible.Playbook().playbook('./ansible/database');
    playbook.inventory('./ansible/inventory_' + username + '_database');
    var promise = playbook.exec();
    promise.then(function(result) {
    });
    playbook.on('stdout', function(data) {
        console.log(data.toString());
    });
    playbook.on('stderr', function(data) {
        console.log(data.toString());
    })
}