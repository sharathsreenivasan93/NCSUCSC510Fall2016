# HW5

Name - Sharath Sreenivasan

Unity ID - ssreeni

Student ID - 200109355


The HW5 repository contains the following files

1. main.yml - the ansible playbook

2. inventory_droplet - inventory file responsible to connect to the digitalocean droplet

The node machine is a droplet of DigitalOcean. The IP address of the droplet is specified in the inventory file for the connection. The command to run the playbook is - 

ansible-playbook -s main.yml --inventory=inventory_droplet

The setup and tasks have been executed sequentially and are clearly shown in the screencast (link provided below)

https://youtu.be/aL-RMEcdehE
