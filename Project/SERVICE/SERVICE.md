#SERVICE MILESTONE

##### KAUSHIK RAJAN - kaushi
##### KESHAV PARTHASARATHY - kpartha2
##### NIKHIL RAMESH - nramesh2
##### ROHIT AHUJA - rahuja
##### SHARATH SREENIVASAN - ssreeni

In this milestone, we enhanced the project by transitioning from mockdata onto real time implementation of the bot. The bot currently executes the 3 use cases as described

1 - Software Installation.

2 - Adding the user as a collaborator to the GitHub Repository.

3 - Granting the user database permissions.

Created two stacks of softwares.

a - Build Stack

b - Standard WordPress Stack

When the user asks for stack, the bot creates a new droplet on DigitalOcean and using the ansible playbook, it installs the corresponding software according to the specified stack. For instance, for the Build stack, it installs jenkins and Git. A prerequisite for this task is that the bot has the SSH keys of the slack user. The bot sends a confirmation email with the IP address and the login details.


To add the user as a collaborator to the GitHub repository, tbe bot first checks if the user is previously a collaborator. If the user is not a collaborator, the bot then adds user to the repository with both pull and push permissions. An email confirmation is received from GitHub

For granting database permissions, a VM is currently hosted on DigitalOcean on which MySQL has been installed. When the user chooses the database he wishes to be a part of, the bot remotely ssh's into the VM, logs in as a root user and creates a user with corresponding privileges for that particular database.


###### Screencast

https://youtu.be/eyYIddZ8y8U
