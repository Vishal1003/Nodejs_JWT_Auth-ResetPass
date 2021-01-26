# Nodejs_JWT_Auth


### This repo is an example of Login-SignUP with NODE.js, MYSQL and JWT(JSON Web Token) Authentication. 

### **UPDATE** : Reset Password Added (jwt/mail-gun/cors/)

## Setting up Project 

* Open Terminal and execute

 `git clone  https://github.com/Vishal1003/Nodejs_JWT_Auth.git`
 
 ` cd YourProjectFolderName`
 
` npm install`

* For setting up mail-gun Go to official doc of mail-gun. Sign up and replace your credentials here.

* Create following env variables (in order to connect to database and use JWT) :
    DB_HOST
    DB_PASS
    DB_USER
    JWT_SECRET
    JWT_EXPIRE

    _reset-password_

    URL
    RESET_PASSWORD_KEY
    DOMAIN_NAME
    MAILGUN_API_KEY
 
* Create the database using following query in mysql :
  `CREATE DATABASE databasename;`

* Create the users table using :

  `use databasename;
create table users(
    uid int not null unique auto_increment,
    username varchar(255) not null,
    email varchar(255) not null,
    passwrd varchar(255) not null,
    primary key (uid),
    resetLink varchar(255) default ""
);`


* Then Back to terminal and run following command 

  `npm start`


