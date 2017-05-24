PRECONDITIONS/PREREQUSITES:

*	Any User wishing to undergo the Onboarding Process should be added onto the Slack channel

*	The account created in Slack should be associated with a valid NC State email id. 

STEPS AND EXPECTED OUTPUT:

1.	User should open the private chat with the Bot via a direct message.

1.	To begin interactions with the Bot, say “hi” or “hello” to the Bot. The Bot should respond with a welcome message along with a list of options to assist in namely, “Github, Database or Software Installations”
 
 1.	In order to test the database component type “Database” in the chat.

      1.	The Bot should request a Team Name in order to access the list of databases that the user might have authorization
      to access.
      
      2.	Provide a team name from the following: CSC510, CSC517, CSC540 and CSC591.
      
      3.	Based on the team name, the Bot will supply a list of databases that the user is allowed to request. Invalid Team
      names will result in the Bot displaying such an error and requesting the name again.
      
      4.	Type the name of any database provided in that list. Once again an invalid name will result in the bot asking for
      name again.
      
      5.	The bot then asks for confirmation to provide access to the requested database.  Saying “No” will cancel the request
      and end this process. Saying “Yes” will result in the Bot responding with a success message saying that Access to the
      Database has been granted.
      
      6.	VERIFICATION: SSH in to IP address using – root@104.131.77.208.(We have sent a separate email for the password) Run
      the command to open mysql “mysql –u ‘username’ –p”. Enter Default Password “12345”. Mysql should now open. Run Command
      “show databases;”. The requested database should now be there in the list of databases that the user has access to. The
      username in the command earlier should be your slack username.
      
      7.	The conversation has ended, so the user must type “Database” once more if he wishes to add another, or they may request another service instead.

 2.	To Test the Github component type “Github” in the chat

      1.	The Bot should request a Team Name in order to access the list of github repos that the user might have
      authorization to access.

      2.	Provide a team name from the following: CSC510, CSC517, CSC540 and CSC591.

      3.	Based on the team name, the Bot will supply a list of repos that the user is allowed to request. Invalid Team
      names will result in the Bot displaying such an error and requesting the name again.

      4.	Enter the name of any repo provided in that list. Once again an invalid name will result in the bot asking for name
      again.

      5.	The bot then asks for confirmation to provide access to the requested repo.  Saying “No” will cancel the request and
      end this process. Saying “Yes” will result in the Bot responding with a success message saying “ Access to the
      Repository has been granted.”

      6.	VERIFICATION: Go to the site: http://github.ncsu.edu/ssreeni/reponame and verify that the user has been added as
      a collaborator, or the user could check his/her github profile home page to see if he/she has been added as
      collaborator by ssreeni (who is the owner of all the repos) .

 3. To Test the Software component type “Configure a new software stack” in the chat

      1.	The bot replies with a list of supported stacks. Currently we support two software stacks: Build and Wordpress.

      2.	Reply to the bot with the stack you wish to configure - "build" or "wordpress". The bot will ask for a final
      confirmation.

      3.	Confirm with the bot by replying "Yes". The bot replies by confirming that the stack is being configured.

      4.	Configuring the stack takes 7-8 minutes and you will receive an email on your registered email id with the details
      of the new environment.

      5.	VERIFICATION : 
       * For build stack confirm configuration by visiting ip-address:8080 to verify if the jenkins server
         is running.
       * For wordpress stack confirm configuration by visiting ip-address to verify if the wordpress server is running.
       The ip-address will be present in the email.

      7.	For both stacks you can SSH onto the VM by running ssh slack-username@ip-address. Password: 12345
