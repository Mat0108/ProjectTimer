const express = require('express');
const cors = require('cors');

//SWAGGER (Documentation)
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const hostname = "0.0.0.0";
const port = 3000;
const server = express();
const mongoose = require("mongoose");

const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'ProjectTimer Documentation API',
            version:'1.0.0',
            description:'Documentation for the ProjectTimer',
            contact:{
                name:'OLIVIA Tania',
                email:'coumba.diankha@my-digital-school.org', 
            },
            servers:["http://localhost:3000"],
        },
        
    },
    apis:["./api/routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

process.env.TZ = 'Europe/Paris'
 
mongoose.connect("mongodb://mongo/timerdb", {
    useNewUrlParser: true,
    user: "timer",
    pass: "timerpass"

}).then(() => {
    console.log('Connexion à la base de données avec succès');
}).catch(err => {
    
    console.log('Erreur de connexion à la base de données');
    process.exit();
});

server.use(express.urlencoded());
server.use(cors());
server.use(express.json());


const userRoute = require("./api/routes/userRoute");
const groupRoute = require("./api/routes/groupRoute");
const projectRoute = require("./api/routes/projectRoute");
const timeRoute = require("./api/routes/timeRoute");
const { application } = require('express');

userRoute(server);
- 
groupRoute(server);
projectRoute(server);
timeRoute(server);

server.listen(port, hostname);

