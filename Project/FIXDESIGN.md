
<div align = "center"> <b><u>FIXDESIGN </div> </b></u>

<br>
<br>

TEAM MEMBERS: 
	Rohit Ahuja(rahuja), Kaushik Rajan(kaushi), Keshav Parthasarathy(kpartha2), Nikhil Ramesh(nramesh2), Sharath Sreenivasan (ssreeni)

<br>

Tasks to Handle : 
1.	Update architecture diagram to include a resource interface so as to avoid hard coding
2.	Increase Interaction with Bot
3.	Be more explicit in mentioning what resources have been provided
4.	Come up with approaches for software installation

<b><u> Updated Architecure Diagram </b></u>

![Alt text](Architecture Diagram.JPG?raw=true "Architecture Design")

The onboarding bot will be hosted on a server. It will be interacting with the users via the slack interface using API calls. Additionally, the bot will also interact with the following:
<br>
•	A lookup database: Consists of a list of all team and domain names and the related software and database accesses that need to be provided. The bot will lookup the database and retrieve the information relevant to the new member.
<br>
•	Project databases: These are the databases which the user requires access to. The bot will ssh to the database server and grant the new team member access to the databases which are returned after the look-up.
<br>
•	Development Environment: The environment for the new team member where the softwares returned from the lookup need to be installed. The bot will ssh to the development environment which is hosted on AWS/Digital Ocean.
<br>
•	Knowledge Sources - Github, Slack and the corresponding mailing lists: We will use the Slack API to add the new member to his corresponding team and the Github API to add him/her as a collaborator on the team's repositories. Also he will be added to the team's mailing lists.
<br>

![Alt text](WireFrame.PNG?raw=true "Wireframe")
