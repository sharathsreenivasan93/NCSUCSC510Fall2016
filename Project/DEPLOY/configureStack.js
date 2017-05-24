require('dotenv').config()
var needle = require('needle');
var os = require('os');
var fs = require('fs');
var Ansible = require('node-ansible');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/local';

var transporter;
var data;
var region;
var image;
var ssh_id;
var size;

var getData = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('data');
    // Find some documents
    collection.find({}, {
        _id: 0
    }).toArray(function(err, docs) {
        assert.equal(err, null);
        data = docs[0];
        region = data.droplet_details[0].region;
        image = data.droplet_details[0].image;
        ssh_id = parseInt(data.droplet_details[0].ssh_id);
        size = data.droplet_details[0].size;
        transporter = nodemailer.createTransport(smtpTransport({
            service: data.software_details[0].service,
            auth: {
                user: data.software_details[0].user,
                pass: process.env.EMAIL_PASS
            }
        }));
        callback(docs);
    });
}

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    getData(db, function() {
        db.close();
    });
});

var config = {};
config.token = process.env.DO_TOKEN;

var headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + config.token
};


var client = {
    createDroplet: function(dropletName, region, imageName, onResponse) {
        var data = {
            "name": dropletName,
            "region": region,
            "size": size,
            "image": imageName,
            // Id to ssh_key already associated with account.
            "ssh_keys": [ssh_id],
            //"ssh_keys":null,
            "backups": false,
            "ipv6": false,
            "user_data": null,
            "private_networking": null
        };

        needle.post("https://api.digitalocean.com/v2/droplets", data, {
            headers: headers,
            json: true
        }, onResponse);
    },

    configureInventory: function(dropletID, onResponse) {
        needle.get("https://api.digitalocean.com/v2/droplets/" + dropletID, {
            headers: headers
        }, onResponse)
    }
};

module.exports = {
    configure: function(stack, username, email) {
        var name = stack + '-' + username;
        client.createDroplet(name, region, image, function(err, resp, body) {
            if (err) {
                console.log(err);
            }
            var dropletId = resp.body.droplet.id;

            setTimeout(function() {
                updateInventory(dropletId, stack, username, email);
            }, 50000)

        });
    }
};

function updateInventory(dropletId, stack, username, email) {

    client.configureInventory(dropletId, function(err, resp, body) {
        var data = resp.body;

        if (data.droplet.id) {
            var dropletName = data.droplet.name;
            var ipAddress = data.droplet.networks.v4[0].ip_address;
            var inventoryContent = '[instances]\n' + dropletName + ' ansible_ssh_host=' + ipAddress + ' ansible_ssh_user=root username=' + username + ' userkeyfile=./../../../keys/id_' + username + '.pub\n';
        }

        fs.writeFile('./ansible/inventory_' + username, inventoryContent, function(err) {
            if (err) {
                return console.log(err);
            } else {
                setTimeout(function() {
                    runPlaybook(stack, username, email, ipAddress);
                }, 50000)

            }
        });

    });
}

function runPlaybook(stack, username, email, ipAddress) {
    var playbook = new Ansible.Playbook().playbook('./ansible/' + stack);
    playbook.inventory('./ansible/inventory_' + username);
    var promise = playbook.exec();
    promise.then(function(result) {
        var body = 'We have created a new ' + stack + 'stack on ' + ipAddress + '. You can login with username ' + username;
        transporter.sendMail({
            from: data.software_details[0].from,
            to: email,
            subject: 'New stack configured!',
            html: '<b>' + body + '</b>'
        });
    });
    playbook.on('stdout', function(data) {
        console.log(data.toString());
    });
    playbook.on('stderr', function(data) {
        console.log(data.toString());
    })
}