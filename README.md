# CM2020-agil-g1g2-1ml
UOL group project

Project Idea: A.I. Workout Application

Why is it unique?
The application instead of listening to songs which could very inconveniently end just when you need a final push during your run, would instead be generated based on both the users current heartbeat and gait using AI.

Crowded marketplace?
The application would be one of the only music applications which do not require an active subscription and allow the user to listen to music offline using no data.

Is it really unique?
Though I’ve heard of AI generated music like Jukebox.ai, i’ve never heard of this technology being coupled with heartbeat/gait to generate music BPM based on your current running speed/workout level.

----
Agile Software Projects Midterm Assessment


The Project Introduction to our project? Name for the app?

After an ideation phase where each of us came up with a few different app ideas, we had a vote and decided to start creating a workout app which utilises some AI functionality to compose music that matches the user’s heart rate in order to create a fulfilling and smooth workout flow.


1) A clearly defined set of deliverable components of the software and the job of 
work required to bring these components to completion.

Our defined set of deliverables will be set out within our team Trello. Instead of an excel sheet or basic list, this will allow us to take a much better agile approach at development by easily being able to change tasks with a simple drag and drop. We can also have far more future development aspirations since we can easily drag unobtainable tasks into a future category or vice versa.

https://trello.com/b/wvVblMxB/cm2020-agil-g1g2-1ml

Below entails both deliverable components and potential future iterations with our application:

The ins/outs (GPIO)

Inputs:
Heart rate
Type of workout
Favorite genre/instrument
Weight & Height
Gait - If not determined by device.
Elevation Change
GPS Data
Workout Goal

Heart rate:

The most important input for our application will be the heart rate taken from a user which will then affect the main functionality of our application - the current song and its BPM. The current heart rate will be fed into the Melody Mixer library which allows us to determine what tempo to play and potentially which instruments to introduce.

Type of Workout:

An input from the user for the type of workout will be beneficial to set a minimum and maximum BPM as well as which instruments can be introduced. For instance, if a user selects a walk as their workout, we may not want to ever go into a more extreme song, even if the user's heart rate temporarily reaches a level which would normally trigger a more intense song during a different workout like a run. To the contrary, for a workout like rowing, we would like to immediately go to a more harsh/upbeat song even if the user’s heart rate has not gotten up to speed yet. This would also be used for workouts such as H.I.T and powerlifting for example.

Favorite genre/instrument:

We would like to get an input from the user of their favorite genre of music or a musical instrument which they enjoy, this could be a part of the setup process for the user. This will allow us to utilize functionality within the melody mixer library to play music which the user will enjoy.

Height & Weight

With height & weight we can better infer a reasonable BPM for the current music being played. Coupled with the gait & heart rate we could accurately play music at a BPM which the user would enjoy.

Gait

Derived from device data, we will attempt to match the current BPM with a user’s gait. Generally when people run while listening to music, their gait tends towards the beat of the music. If we also take into account elevation gains and GPS data, we could purposefully increase the BPM to help achieve a faster overall time for the user.

Elevation Change

With elevation change as a data point over time we can predict a user’s heart rate climbing, this will allow us to change the BPM of the current music being played to a faster rate or slower rate, even before the heart rate changes.

GPS

Not only will GPS data help us with prediction models for the ‘last lap boost’ but also provide essential elevation data with modern maps. Future implementations could include user input to boost the BPM of the music during certain areas. Also future implementations could include boosted BPM based on historically slower areas during a user's run.

Workout Goal

Since workout goals can be vastly different for users, we will need this as a data point to set a realistic BPM threshold for the user. For instance: If we take a user who is overweight for their height wishes to select a walk as a workout type, even if their heart rate goes above a certain threshold which we would normally increase the BPM of the music, we should hold the current BPM so we do not go too extreme for the workout being done.
	
Outputs:
Music BPM
Genre for music
Instrument for music
Personalized UI

Music BPM

The essence of the application will be outputting A.I. generated music utilizing a library and attempting to match the BPM to best fit the current workout for a user. Our application needs to output a number which will be interpreted as a BPM, to the melody mixer library based on a number of calculated variables.

Genre for music

Based on the genre input from a user, the output for the music will need to be one of a predefined set of genres. This should be able to be one or multiple.

Instrument for music

The instrument output will be based on the available instruments within the melody mixer library which we can access. This will also be based on the input which the user selects and output the instrument(s) during the workout for the music.

Personalized UI

Based on all the user inputs which will be done at the start of the application, the personalized UI will be shown to the user before, during, and after each workout. This will show which current options are selected, as well as an option to change instruments, genres, and user info such as height & weight or gait.

2) The defined timescale of work, including any dependencies, milestones or 
contingencies.

Time scale/milestones will be referenced on the Gantt chart.

Out project will be made with the library melody mixer which utilizes MusicVAE.js and plays back the tones via tone.js all within a beautifully created UI/visualizations in P5.js

The main contingency is the fact of the melody mixer being far enough through development to play nicely with p5.js. This library is in its infancy and hasn’t (to my knowledge) been deployed in a well known production application. Our entire application is also based on the fact that the melody mixer can in fact be used to create music in real-time based on an input for BPM.

3) A formal specification of the desired system (e.g. UML, technical and functional specification)
[UML Link]

4) A clearly defined scope for the project.

Our workout application will take the current heart rate of a user and plug in to a library which generates music in real-time and puts out music based on the aforementioned heart rate. Depending on the battery life of the device that is reading the users heart rate we can only poll the users heart rate so often, this will impact how often we update the BPM function within the application. Read-rate will need to be tested with users. How quickly the song updates from the Melody Mixer library could greatly impact how well the application is received by users. An application which updates the songs too quickly could create a poor experience for users as they don’t have enough time to enjoy the current song. Likewise, an application which updates songs too slowly could also negatively affect a users experience by simply not giving the user the experience which the application was created for, dynamic music. Music updated too slowly will simply recreate the experience which a user can find within any other music application. 


5) Some evidence of requirements elicitation involving some/all of your project
stakeholders. 

Stakeholders for this project consists of the four members in the project group; Heng, Ken, Saana and Sam (in alphabetical order). As the leader of the group, Heng managed meetings, and prepared agendas for each meeting. Ken was the timekeeper of the group and made sure that agenda items did not go over time in meetings. Saana had the role of Minutes recorder who took notes for everything discussed in the meeting. Since Sam had a rich background in developing applications and came up with the idea of the project, he took the role of software developer. He provided the core idea of the project with individual research to support it through Gantt Chart (a widely used online project planning platform).


6)  A research summary that highlights the challenges of working within your
chosen domain.

Considering our technical skills, the languages (issues with Python) had to find things that work with p5.js which is pretty limited, also the domain has to work with the heart rate so we’re limited on devices


7) Evidence that compares your project to similar software tools (e.g. market analysis.)
Market analysis in progress

8) A description of your approach that discusses the motivations and reasoning for working in a particular manner (e.g. Agile, User-Centred Design, Test-Driven Development.)
Text

9) Some early prototypes showing how the project will work and highlighting the strengths and weaknesses of your proposition.
Text

10) Some early evidence of assumption testing and validation of your designs to date (e.g. user tests or automated feedback such as W3C validation/accessibility testing, heuristic tests etc.)
We know the libraries we’re utilising work on different similar projects so we know the technologies work on what we are attempting to create.
Assumption testing?
User tests will be done in the second phase of the project once the app is up and running.

Survey
We conducted a survey to find out about users’ preferences when it comes to working out and workout applications. The data collected in the survey is helping us in every stage of the design process and confirming assumptions which we already had about users’ preferences as well as giving us new information.
The survey was taken by 24 people over the age of 18. Some results were expected, for example that people like listening to upbeat music while working out, while others were less predictable. The results made us shift our focus to aspects of the design that the respondents seemed to find more important and sometimes consider some aspects we had not thought of.
Eye-opening findings
Our survey found that:
100% of respondents use workout apps either sometimes (50%) or every time (50%) they work out
music apps are the most popular type of app to use while working out - 80% of our respondents said they use them while working out
nearly three quarters of our respondents feel that the music they listen to is sometimes either too slow paced or too fast for their current workout level
Further results
While music apps were the most popular type of workout app, half of the respondents said they like using heart rate monitoring apps and a third said they like using instructional apps while working out. One sixth went on to clarify that they like listening to podcasts and audiobooks during their workout which was something we had not considered.
The most sought-after qualities in a workout app were ease of use (20 votes) and simplicity (18 votes), followed by customisability (10 votes) and minimalistic user interface (8 votes).
As we had expected, upbeat music was our respondents’ favourite type of music to listen to (18 votes) but there were plenty of other popular genres and types of music. These include intense music (10 votes) and music with lyrics (10 votes), dance music (9 votes) and electronic music (9 votes), and aggressive music (8 votes). A couple of respondents specified that the type of music they listen to while working out depends on their mood and the type of workout.
Most respondents (nearly 60%) said that they feel the need to change music while doing a workout, for example to more intense music to finish that last lap, which is something that could distract or disturb the flow of the workout. This is an issue our app is aiming to minimise.


11) A critical evaluation of your concept, your project in its current state and the proposed software project.
Text




----

Archive:

All Ideas
https://docs.google.com/document/d/1PV29vzTyUoLkGhNH5Xug1lg2ERtEnbe-sMnhwRfX9-8/edit

Meetings Agenda + Times
https://docs.google.com/document/d/171RsXDX1XvPEkJw7jU0OO_IPL1mO6BYX/edit

Code rundown for melody mixer
https://medium.com/@torinblankensmith/melody-mixer-using-deeplearn-js-to-mix-melodies-in-the-browser-8ad5b42b4d0b

Gantt Chart
https://prod.teamgantt.com/gantt/schedule/?ids=2453821#ids=2453821&user=&custom=&company=&hide_completed=false&date_filter=&color_filter=

Trello
https://trello.com/invite/b/wvVblMxB/29dd26ac68bb493b9a4f37c12ee91871/cm2020-agil-g1g2-1ml

Survey
https://s.surveyplanet.com/1GcsjHkaL

Github (here)
https://github.com/Samkishline/CM2020-agil-g1g2-1ml.git

Midterm info
https://slack-files.com/files-pri-safe/TDT1N1BUG-F01GW533D7Z/agile_uol_midterm.pdf?c=1609235255-2113d8528352387b

----

Tools & Links:

https://creately.com/lp/uml-diagram-tool/

www.canva.com

https://prod.teamgantt.com/

https://medium.com/@torinblankensmith/melody-mixer-using-deeplearn-js-to-mix-melodies-in-the-browser-8ad5b42b4d0b
