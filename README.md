# Nodejs_JWT_Auth


### This repo is an example of Login-SignUP with NODE.js AND MYSQL and JWT(JSON Web Token) Authentication. 
## Setting up Project 

* Open Terminal and execute

 `git clone  https://github.com/akhilpy/Node-MySQL-JWT-Signup-Login-API.git`
 
 ` cd YourProjectFolderName`
 
` npm install`

* Create following env variables (in order to connect to database and use JWT) :
    DB_HOST
    DB_PASS
    DB_USER
    JWT_SECRET
    JWT_EXPIRE
 
* Create the database using following query in mysql :
  `CREATE DATABASE databasename;`

* Create the users table using :

  `use databasename;
create table users(
    uid int not null unique auto_increment,
    username varchar(255) not null,
    email varchar(255) not null,
    passwrd varchar(255) not null,
    primary key (uid)
);`


* Then Back to terminal and run following command 

  `npm start`


