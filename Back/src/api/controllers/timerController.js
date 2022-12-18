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

// Pauser le timer
exports.pauseTimer = (req, res) => {
    TimerModel.findById(req.params.timerId, (error, result) => {
        if(timer.isRunning()){
            let paused = result.pausedAt;

            timer.pause();

            paused.push(timer.format("%hh %mm %ss %msms"));
        
            TimerModel.findByIdAndUpdate(req.params.timerId, {pausedAt: paused}, {new: true}, (error, result) => {
                if(error){
                    res.status(401);
                    console.log(error);
                    res.json({message: "Rêquete invalide"});
                }
                else{
                    res.status(200);
                    res.json(result);
                }
            })
        }
        else{
            res.status(500);
            res.json("Timer n'a pas démarré");
        }
    });
}