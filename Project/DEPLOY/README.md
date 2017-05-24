#DEPLOY MILESTONE

##### KAUSHIK RAJAN - kaushi
##### KESHAV PARTHASARATHY - kpartha2
##### NIKHIL RAMESH - nramesh2
##### ROHIT AHUJA - rahuja
##### SHARATH SREENIVASAN - ssreeni


In this deploy milestone, the entire process of deploying the bot onto a remote server and running it along with all its associated dependencies have been automated. A droplet of digitalocean has been provisioned using a script, and the bot is run on that droplet using forever. An Ansible playbook was created to deploy the bot on the droplet along with associated softwares and tools like git, node.js, mongoDB, forever. 

Run the below steps to provision and configure the bot environment:

1. Clone the repository.
2. Install ansible on the host machine.
3. CD into the directory ~/DEPLOY/deployment.
4. To provision the droplet run the below command. You will need to set API token for digitalocean.

        node digitalOceanProvision.js
  
5. Once the droplet has been provisioned run the below command to run the ansible playbook which will configure the environnment and start the bot.

        ansible-playbook playbook.yml -i inventory



The bot currently executes the 3 use cases as described

1. Software Installation - two choices of software stacks - Build and WordPress.

2. Adding the user as a collaborator to the GitHub Repository.

3. Granting the user database permissions.

The description of all 3 use cases, and how they execute are provided in the Acceptance Testing markdown file. 

###### Screencasts

https://www.youtube.com/watch?v=FErVPuHSA0E

https://www.youtube.com/watch?v=LEnlQYOYCc0
