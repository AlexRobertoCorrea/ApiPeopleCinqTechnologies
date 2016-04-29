# ApiPeopleCinqTechnologies

This is the version 1.0 of Api People Cinq Technologies made by Alex Roberto Corrêa. This api allows you create, list, show, 
update and delete people and it is useful when we're using [Postman](https://www.getpostman.com/) or a script itself.

## Getting Started

To use Api People Cinq Technologies, you'll need:

- Download the package that can be done `git clone https://github.com/AlexRobertoCorrea/ApiPeopleCinqTechnologies.git`
- Install [MongoDB](https://docs.mongodb.org/manual/installation/) and [NodeJS version 0.12.7](https://nodejs.org/en/blog/release/v0.12.7/)  
- Use the command line (if you are using GNU/Linux) `cd ApiPeopleCinqTechnologies`
- Install the dependences: `npm install`
- Start using the api with `node server.js`
- Or you can run the tests, but before you need install [Grunt Cli](https://www.npmjs.com/package/grunt-cli)
 witn `sudo npm install -g grunt-cli` and run `npm test`

## Tutorial

If you'd like how to use the People Cinq Technologies, please, go to [Api Clients Minutrade with Apiary](http://docs.apipeoplecinqtechnologies.apiary.io/) 
where you can see all operations and its detailed examples.

## Website

It is possible access the api via website. So, you need run:

```
npm install
```

Install [Bower](http://bower.io/): `sudo npm install -g bower` and run:

```
bower install
```

From here, you have two options: run `node server.js` and access `http://localhost:3002/` or you can run
a fast version doing `grunt serve:dist` and access `http://localhost:3000/`.

The site's home screen is a people list, which you can click on "Create person," click on "Edit" or "Delete". 
In the creation / update person screen is where you enter the data and save.

## How it was made

The People Cinq Technologies was made using NodeJS, Express framework, AngularJS and MongoDB database in
GNU/Linux dist Ubuntu 16.04.
