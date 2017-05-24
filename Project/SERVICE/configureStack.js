var needle = require('needle');
var os = require('os');
var fs = require('fs');
var Ansible = require('node-ansible');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
   service: 'Gmail',
   auth: {
       user: 'onboarding.bot510',
       pass: process.env.EMAIL_PASS
   }
}));


var config = {};
config.token = process.env.TOKEN_DO;

var headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + config.token
};


var client = {
    createDroplet: function(dropletName, region, imageName, onResponse) {
        var data = {
            "name": dropletName,
            "region": region,
            "size": "512mb",
            "image": imageName,
            // Id to ssh_key already associated with account.
            "ssh_keys": [3378351],
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

var region = 'nyc1';
var image = 'ubuntu-14-04-x64';

module.exports = {
    configure: function(stack, username, email) {
        var name = stack + '-' + username;
        client.createDroplet(name, region, image, function(err, resp, body) {
            console.log('Attempting to create Droplet');
            // StatusCode 202 - Means server accepted request.
            if (!err && resp.statusCode == 202) {
                console.log('Droplet created successfully.');
            }

            var dropletId = resp.body.droplet.id;
            console.log('Waiting for droplet to initialize');

            setTimeout(function() {
                updateInventory(dropletId, stack, username, email);
            }, 30000)

        });
    }
};

function updateInventory(dropletId, stack, username, email) {

    client.configureInventory(dropletId, function(err, resp, body) {
        var data = resp.body;

        if (data.droplet.id) {
            var dropletName = data.droplet.name;
            var ipAddress = data.droplet.networks.v4[0].ip_address;
            var inventoryContent = '[instances]\n' + dropletName + ' ansible_ssh_host=' + ipAddress + ' ansible_ssh_user=root username='+username+' userkeyfile=./../../../keys/id_'+username+'.pub\n';
        }

        fs.writeFile('./ansible/inventory_'+username, inventoryContent, function(err) {
            if (err) {
                return console.log(err);
            } else {
                console.log("Inventory File Updated for Digital Ocean droplet");
                setTimeout(function() {
                    runPlaybook(stack, username, email, ipAddress);
                }, 30000)

            }
        });

    });
}

function runPlaybook(stack, username, email, ipAddress) {
    console.log('Starting playbook');
    var playbook = new Ansible.Playbook().playbook('./ansible/' + stack);
    playbook.inventory('./ansible/inventory_'+username);
    var promise = playbook.exec();
    promise.then(function(result) {
        console.log(result.output);
        console.log(result.code);
        console.log('Playbook has been executed successfully');
        var body = 'We have created a new ' + stack + 'stack on ' + ipAddress + '. You can login with username ' + username;
        console.log(email);
        transporter.sendMail({
            from: 'onboarding.bot510@gmail.com',
            to: email,
            subject: 'New stack configured!',
            html: '<b>'+body+'</b>'
        });  
    });
    playbook.on('stdout', function(data) {
        console.log(data.toString());
    });
    playbook.on('stderr', function(data) {
        console.log(data.toString());
    })
}