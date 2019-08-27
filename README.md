# Full-stack Quiz Creator

## Overview
This is a full-stack MERN app that allows users to create their own quizzes and then run them. Styling is done using <a href="https://materializecss.com/">Materialize.css.</a>

<p align="center">
   <img src="siteimages/choosequiz.png" width="400px" />
</p>

&nbsp;

### Why build it?
The general structure of the app seemed to be one which is quite applicable to a range of other possible ideas I had, and thus I decided to begin with something that seemed manageable.

<p align="center">
   <img src="siteimages/selectanswer.png" width="400px" />
</p>

### Edit Quiz
Quizzes are fully editable, which includes both quiz and question images, and which are sent through to the back end and handled using <a href="https://www.npmjs.com/package/multer">Multer.</a>

<p align="center">
   <img src="siteimages/editquiz.png" width="400px" />
</p>

### Future Development
An initial improvement to the app would be unit and component Tests. Aside from this, implementation of a login system and some kind of user scoreboard functionality as well as user statistics that display average user results on quizzes and records quiz history would be natural next steps.


&nbsp;

## Live Version
You can see a live working version hosted on Heroku here:

blbal link


## Installation 
```bash
cd fullstack-quiz-creator
npm install
npm run concurrently 
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
