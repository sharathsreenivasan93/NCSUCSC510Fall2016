##Use Cases


Use Case 1: Install software/packages on development environment.

1. Preconditions <br>
  User must have a slack profile and joined the bot’s channel. <br>
  The bot should have the required keys to SSH to the user's development environment.
2. Main Flow <br>
    User provides the bot with the name of the team[S1]. Bot provides list of suggested softwares [S2]. Bot installs software as requested [S3].
3. Subflows <br>
   [S1] User provides bot with name of the team he/she belongs to. <br>
   [S2] Bot performs a lookup on team same. Provides a list of suggested softwares to the user. <br>
   [S3] Bot will SSH onto the development environment of the user. Install requested software/package. Provide confirmation to user.<br>
4. Alternate Flows <br>
   [E1] Bot does not support the installation of software/package provides by user.

USE CASE 2: Add as collaborator to Github repositories.

1 Preconditions
     User must have a Github account associated with the official email id.
     Bot should have the API keys with the corresponding repositories.

2. Main Flow
    Based on the user’s team name, the bot provides the user with a list of Github repositories. [S1]
    User provides the bot with the list of Github repositories that he/she wishes to be added to.[S2]
    Bot adds the user as a collaborator to the specified repositories.[S3]

3. Subflows
    [S1] Bot retrieves the user’s team name based on the user’s profile; Bot looks up for team name and associated
    repositories and provides this list to the user.
    [S2] User provides the list of repositories in the format {repo1, repo2,...}.
    [S3] Bot fetches the API keys of the corresponding repositories; Bot adds the user as collaborator to these repositories.

4. Alternative Flow
	[E1] Bot doesn’t find the corresponding  Github repository name that was provided by the user.

	    
	    
USE CASE 3: Grant access to databases.

1. Preconditions
     Bot should have the SSH key and superuser privileges to the database server.
	
2. Main Flow
      Based on the user’s team name, the bot provides the user with a list of databases. [S1]
      User provides the bot with the list of databases that he/she wishes to be added to.[S2]
      Bot provides the user access to the chosen databases.[S3]
3.Subflow
      [S1] Bot retrieves the user’s team name based on the user’s profile; Bot looks up for team name and associated 
      databases and provides this list to the user.
      [S2] User provides the list of databases in the format {database1, database2,...}.
      [S3] Bot uses the keys to SSH onto the corresponding databases; Bot grants the user access to the databases.

4. Alternative Flow
	[E1] Bot doesn’t find the database which was asked by the user.

  
Mocking Data is located in the file <b>Mockdata.json</b>

Bot implementation code is located in the file <b>bot.js</b>

Selenium Testing code is located in the file <b>SeleniumTesting.java</b>

Task Tracking worksheet is present in the file <b>WORKSHEET.md </b>

Youtube link for the screencast is : <a href = "https://youtu.be/4knHebetFEY"> https://youtu.be/4knHebetFEY </a> </br>
Youtube link for bonus: https://youtu.be/DflN839czqw
