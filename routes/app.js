/*
Author :  Prestone 
*/

const express = require('express');
const app = express();
const axios = require('axios');
const qs = require('qs');
let server = require('http').Server(app);
let io = require('socket.io')(server);
var bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const fs = require('fs');


// parse application/json
app.use(bodyParser.json());


app.get('/appInfo', (req, res) => {
    return res.json({
        status: 200,
        message: 'Welcome to script reuse'
    });
});


app.post('/postData', (req, res) => {


    //Variables from the request 

    const modularity = req.body.module;
    const app_name = req.body.app_name;
    const cherwell_id = req.body.cherwell_id;
    const budget_center = req.body.budget_center;
    const responsible_department = req.body.responsible_department;
    const environment = req.body.environment;
    const bussiness_owner = req.body.bussiness_owner;
    const responsible_team = req.body.responsible_team;
    const ownerteamemail = req.body.ownerteamemail;
    const supportcontact = req.body.supportcontact;


    const data = {
        modularity: modularity,
        APP_NAME: app_name,
        CHERWELL_ID: cherwell_id,
        BUDGET_CENTRE: budget_center,
        RESPONSIBLE_DEPARTMENT: responsible_department,
        Environment: environment,
        BUSINESS_OWNER: bussiness_owner,
        RESPONSIBLE_TEAM: responsible_team,
        OwnerTeamEmail: ownerteamemail,
        SupportContact: supportcontact,

    };



    return res.json({
        status: 200,
        message: data
    });
});



//Create template


app.post('/createTemplate', (req, res) => {




    try {



        //Variables from the request 

        const modularity = req.body.module;
        const app_name = req.body.app_name;
        const cherwell_id = req.body.cherwell_id;
        const budget_center = req.body.budget_center;
        const responsible_department = req.body.responsible_department;
        const environment = req.body.environment;
        const bussiness_owner = req.body.bussiness_owner;
        const responsible_team = req.body.responsible_team;
        const ownerteamemail = req.body.ownerteamemail;
        const supportcontact = req.body.supportcontact;



        // Define the data to be passed to the template

        const data = {
            modularity: modularity,
            APP_NAME: app_name,
            CHERWELL_ID: cherwell_id,
            BUDGET_CENTRE: budget_center,
            RESPONSIBLE_DEPARTMENT: responsible_department,
            Environment: environment,
            BUSINESS_OWNER: bussiness_owner,
            RESPONSIBLE_TEAM: responsible_team,
            OwnerTeamEmail: ownerteamemail,
            SupportContact: supportcontact,

        };


        //Prepare template based on the supplied module

        if (modularity === 'S3') {

            // Compile the Handlebars template from S3
            const s3template = '';
            const template = Handlebars.compile(fs.readFileSync('resources/oo-s3-template.hbs', 'utf8'));

            // Render the template with the data
            const rendered = template(data);

            // Write the rendered JSON to a file
            fs.writeFileSync('S3-template.json', rendered);

            console.log('S3-template.json file generated successfully');

            const file = 'S3-template.json';

            // Check if the file exists
            if (!fs.existsSync(file)) {
                console.error('File not found:', file);
                res.writeHead(404);
                res.end();
                return;
            }

            // Set the response headers
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${file}"`);

            // Return the file as the response
            const stream = fs.createReadStream(file);
            stream.pipe(res);


        } else if (modularity === 'ECSSTACK') {

            // Compile the Handlebars template from S3
            const s3template = '';
            const template = Handlebars.compile(fs.readFileSync('resources/oo-s3-template.hbs', 'utf8'));

            // Render the template with the data
            const rendered = template(data);
            // Write the rendered JSON to a file
            fs.writeFileSync('S3-template.json', rendered);

            console.log('S3-template.json file generated successfully');

            const file = 'S3-template.json';

            // Check if the file exists
            if (!fs.existsSync(file)) {
                console.error('File not found:', file);
                res.writeHead(404);
                res.end();
                return;
            }

            // Set the response headers
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${file}"`);

            // Return the file as the response
            const stream = fs.createReadStream(file);
            stream.pipe(res);


        }



    } catch (error) {
        console.log(error.message);

    }




});






module.exports = app;