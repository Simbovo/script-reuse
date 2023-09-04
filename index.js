/*
Author :  Prestone 
*/

const express = require('express');
const serverless = require('serverless-http');

const app = express();

const server = require('http').Server(app);
const path = require('path');



const postsRoute = require('./routes/app');

app.use('/', postsRoute);

server.listen(3000, () => console.log('Listening on port 3000...'));

//exports.handler = serverless(app);


/*
// lambda.js
'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./routes/app.js')
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }
*/