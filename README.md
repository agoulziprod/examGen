# examGen
this is the repository for exams generator project v 0.1 done using js technologies

### How to use this code
1. __clone this project__
```
git clone https://github.com/agoulziprod/examGen.git
```
2. __run your mongo db client and server__
```
mongo
mongod
```
(if these commandes doesn't work try to navigate to your mongo db `bin` folder)
3. __run your node.js server__
```
nodemon
```
4. __run your web application on the server__
```
http://localhost:5000/
```
>
### Project idea and scope
This is an academic project that I'm working on it, 
This is a plateforme that let proffessors to manage theire tests and quizes easly
The proffesor : can create his own tests, with different questions 
the student : can passe any tast, if he had the key (identifier of the test created by the proffessor)
once the student passes and submits the responses, the plateforme shows the score and the proffesor can see responses he got and scores of theire studentes.

### Technologies :collision:
one of the goals of this project is to master javascripts technologies, suach as : node.js, express, mongo as database and others .. so in this project we're going to use only JS technologies.

### Completed tesks
********
__Authentification__ : using Passport.js
********
__Test__ : CRUD by a proffesor
********
__Test__ : a proffesor can use an input to search for a test*
********
__Question__ : Create and delete by a proffessor*
********
__QuestionReponces__ : Create done (fixed all related bugs)
********
### To do  list
********
__Question__ : update a question
********
__Test search input__ : got to add an action to the search input ie. whene the proffesor clic on an result he got to be redirected to the test details page .
********
__QuestionReponces__ : CRUD. (responses that will shown for every question)
********
__User__ : add role to the model (adding role to distinguish roles : proffesor, student, admin)
********
__QuestionInstance__: is the instance that will be generated for every student (randomly from the question schema)

### perspective :rocket:
add more question types
using socket.io to make it real time app
admin dashboard
