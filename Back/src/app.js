const express = require('express');
const cors = require('cors');

const hostname = "0.0.0.0";
const port = 3000;

const server = express();

const mongoose = require("mongoose");

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
server.use(express.json());
server.use(cors());

const userRoute = require("./api/routes/userRoute");
const groupRoute = require("./api/routes/groupRoute");
const projectRoute = require("./api/routes/projectRoute");
const timerRoute = require("./api/routes/timerRoute");

userRoute(server);
groupRoute(server);
projectRoute(server);
timerRoute(server);

server.listen(port, hostname);

