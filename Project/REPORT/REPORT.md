
# Onboarding Bot

## Problem Description

<p> The onboarding bot is a software bot that will ensure successful onboarding of a new engineer into a team. When a software engineer newly joins a team, he/she must perform certain necessary tasks and duties as part of the “onboarding” process. These include varying tasks such as setting up the development environment, getting the engineer up to speed with the status of the team’s projects, and getting him/her familiarized with the other members of the team. This manual onboarding process, quite often, can be a problem, since it is time-consuming and requires additional effort on behalf of the team. Often, when human error is factored into the process, there could be mistakes committed, such as overlooking the installations of certain key tools. Thus, there is scope for these processes to be automated, and thereby reducing the drudgery associated with manually performing them.

The bot aims to perform three primary tasks as part of the onboarding process:

 * Install necessary software on development environment.
 * Provide the user with access to knowledge sources like GitHub and Slack.
 * Grant access to the required databases by procuring necessary permissions.

The above tasks, when manually performed, require time and effort and are repetitive in nature. Thus, a bot will provide a good solution in this scenario, as it will automate the successful completion of these pre-defined tasks. It will greatly reduce the burden on the team, thereby helping to increase efficiency. It will also help negate the scope for human error.

## Primary Features and Screenshots

The following are the primary features of the bot:

 1. Installing software stacks based on user’s choice.
 2. Granting access to the user to corresponding databases based on the provided team name.
 3. Adding the user as a collaborator to a specific Github repository.

### Installing Software Stacks

 1. Slack Interaction

 ![Alt text](SoftwareStackSlackInteraction.JPG?raw=true "Architecture Design")

 2. Emailing the user informing him/her of a successful installation.

 ![Alt text](SoftwareStackEmail.JPG?raw=true "Architecture Design")

 3. Running Jenkins server

 ![Alt text](SoftwareStackJenkins.JPG?raw=true "Architecture Design")

### Granting Database Access

 1. Slack Interaction

 ![Alt text](DatabaseAccessSlackInteraction.JPG?raw=true "Architecture Design")

 2. Checking database access in the Digital Ocean droplet

 ![Alt text](DatabaseAccessCheck.JPG?raw=true "Architecture Design")

### Adding user as collaborator in Github

 1. Slack Interaction

 ![Alt text](GithubSlackInteraction.JPG?raw=true "Architecture Design")

 2. User added as a collaborator in Github

 ![Alt text](GithubAddCollaborator.JPG?raw=true "Architecture Design")
 
 
## Reflection on the development process and project
 
### Overview of your whole development process
We started off with the Design phase of the project in which we created design sketches and architectural diagrams from the Onboarding bot. We also specified the design patterns used. The second phase of the project involved developing the interaction component of the bot for our three specified use cases. We integrated the bot with the slack platform and mocked data to demonstrate the use cases. We also used selenium testing to test the use cases and integrated it with Travis CI and Sauce Labs. In the service milestone the first task was to learn Ansible which would be the technology used to implement two of our use cases. We learnt about the concept of roles in Ansible which would allow us to create reusable code for our technology stacks. We removed the mock data and replaced it with a Mongo Database. Finally, we automated the process of deployment by using Ansible. Throughout the development process we used Trello to create SMART stories and submitted a worksheet to track the tasks.

### Key points during this process

* One of the key design decisions during the process was the choice of the configuration management tool to provision the software stack. We had the choice between Ansible and Chef. We decided to go with ansible because it is easy to learn and contains a library called ansible-galaxy which has well defined roles for certain tasks. Chef is written in Ruby and has a steeper learning curve than ansible.
* Another decision was to decide how to grant the permissions for the database. Fortunately, ansible has a databases module to grant/revoke database permissions on MySQL.

### Problems and Solutions

* To automate the deployment process we were having problems setting up the API tokens using environment variables. We tried setting them using ansible but because ansible creates a new ssh session to setup the variables, the values of the tokens was not persisting in other sessions. To solve the problem we made use of a Node module called dotenv which is a zero-dependency module that loads environment variables from a .env file into process.env

### Valuble learning from the project

* Technologies learnt included : NodeJS, Ansible and MongoDB.
* We gained insight into the agile software development process starting from design to deployment.
* Improved teamwork skills by working with other people.


## Bot Limitations and Possible Future Work

### Limitations - 

* Auto-prompting of the user's responses wasn't implemented. Every time the user needs to specify a team or repo name, he/she will have to type it out in full. 
* The bot doesn't allow the user to create new databases or repos. it only possesses the functionality of adding the user to already existing databases/repositories.
* There are no early exit points during the interaction. If the user decides to back out of one functionality, say getting added to a github repo, he/she will not be able to do so quickly. 

### Future Work - 

* The bot can be enhanced to support offboarding tasks - revoking accesses and permissions - when a developer is leaving a team. 
* Support for adding the user to social/discussion forums which are used by the development team. 
* Providing installations for several other popular softwares and technology stacks. 
 

