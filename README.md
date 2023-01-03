# Project Timer

We have named our project timer, "Timeroo". Timeroo is a web application that allows you to manage and see all the times, you have passed on your projects which you also able to assign one or more groups to a project you wanted. This group contains all the users that you wanted to invite or add.

## Team members

- Matthieu Barnabé
- Coumba DIANKHA
- Tania OLIVIA
- Nihel OUANASSI

## Features

- Sign up / Login.
- Team view to add, modify or remove a group with users
- Project view to add, modify or remove a project
- Timer view : List all logged time by the connected user.
- Timer view action : Play / Stop action with a project assigned.

## Technologies

- [react] - framework js 
- [tailwind] - framework css
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 
- [mongodb] - BDD
- [mongoose] - make schema for mongodb

Project timer itself is open source with a [public repository][projectTimer] on GitHub.

## Installation

Project Timer requires [Node.js](https://nodejs.org/) v10+ to run.

Install and launch docker to start the server for both API and the web application.

```sh
cd ProjectTimer/
docker-compose up --build
```

To see the web application, you need to wait the docker finish running. Docker finished running when you see the log below : 

```
front            | Starting the development server...
front            | 
front            | Compiled successfully!
front            | 
front            | You can now view landing_page in the browser.
front            | 
front            |   Local:            http://localhost:4000
front            |   On Your Network:  http://192.168.128.2:4000
front            | 
front            | Note that the development build is not optimized.
front            | To create a production build, use npm run build.
front            | 
front            | webpack compiled successfully
```

Stop docker

```sh
docker-compose down
```
## Timeroo
You can find our web application Timeroo, by going to http://localhost:4000. If this is your first time going to Timeroo, you need to create an account to have access to all the functionalities of Timeroo. When you've created an account, you will be redirected to the login page where you need to fill in your email and password. After, you're already logged in. You can manage your time tracker, groups and projects.

## Database
 
 This project use mongodb for the databse to save all the datas. We also use mongo-express to see all the datas visually. To access the mongo-express, you need to go to http://localhost:8081 and a username and password will be demanded to have access to the data.
 ```
 Username : timer
 Password : timerpass
 ```
 
## Swagger documentation

Swagger is used to documentate all the APIs available in the project Timer by visualising it on another route. To see the Swagger documentation, you only need to go to http://localhost:3000/api-docs


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [react]:<https://fr.reactjs.org>
   [tailwind]:<https://tailwindcss.com>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [mongoose]:<https://mongoosejs.com>
   [mongodb]:<https://www.mongodb.com>
   [projectTimer]:<https://github.com/Mat0108/ProjectTimer>
   
   
