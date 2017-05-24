var needle = require('needle');
var os = require('os');
var fs = require('fs');
var Ansible = require('node-ansible');

module.exports = {
    updateInventory: function(username, dbname) {

        var ipAddress = '104.131.77.208';
        var pwd = '12345';
        var inventoryContent = '[instances]\n' + ipAddress + ' ansible_ssh_host=' + ipAddress + ' ansible_ssh_user=root database_username=' + username + ' database_password=' + pwd + ' database_name=' + dbname + '\n';
        fs.writeFile('./ansible/inventory_' + username + '_database', inventoryContent, function(err) {
            if (err) {
                return console.log(err);
            } else {
                console.log("Inventory File Updated for Digital Ocean Database");
                runPlaybook(username, pwd, dbname);

            }
        });
    }
}

function runPlaybook(username, pwd, dbname) {
    console.log('Starting playbook');
    var playbook = new Ansible.Playbook().playbook('./ansible/database');
    playbook.inventory('./ansible/inventory_' + username + '_database');
    var promise = playbook.exec();
    promise.then(function(result) {
        console.log(result.output);
        console.log(result.code);
        console.log('Playbook has been executed successfully');
    });
    playbook.on('stdout', function(data) {
        console.log(data.toString());
    });
    playbook.on('stderr', function(data) {
        console.log(data.toString());
    })
}