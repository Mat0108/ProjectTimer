const TimerModel = require("../models/timerModel");
const { Timer } = require('timer-node');

const timer = new Timer();

// Démarrer le timer
exports.startTimer = (req, res) => {
    timer.start();

    let newTimer = new TimerModel({
        startedAt: timer.format("%hh %mm %ss %msms")
    });

    newTimer.save((error, timer) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Rêquete invalide"});
        }
        else{
            res.status(200);
            res.json(timer);
        }
    });
}