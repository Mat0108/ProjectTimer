const Time = require("../models/timeModel");
const { Timer } = require('timer-node');

const timer = new Timer();

// Convertir les millisecondes en HH:MM:SS.mmm
function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000)),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

// Convertir le time (HH:MM:SS.mmm) en millisecondes
function timeToMs(time){
    const timeFormatted = time.replace(".", ":")
    const timeParts = timeFormatted.split(":");
    return Math.floor(((timeParts[0]*60*60+timeParts[1]*60+timeParts[2])*1000))
}

// Démarrer le time
exports.startTime = (req, res) => {
    timer.start();
    
    let newTime = new Time({
        times: [
            {
                date: new Date(timer.startedAt()).toDateString(),
                timestampTotal: new Date(timer.startedAt()).toTimeString().slice(0, 8) + ' - ' + new Date(timer.startedAt()).toTimeString().slice(0, 8),
                timeTotal: msToTime(timer.ms()),
                history: [
                    {
                        startTimestamp: new Date(timer.startedAt()).toTimeString().slice(0, 8),
                        endTimestamp: new Date(timer.startedAt()).toTimeString().slice(0, 8),
                        start: msToTime(timer.ms()),
                        end: msToTime(timer.ms())
                    }
                ]
            }
        ]
    });

    newTime.save((error, time) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Rêquete invalide"});
        }
        else{
            res.status(200);
            res.json(time);
        }
    });
}

// Recontinuer le time
exports.continueTime = (req, res) => {
    Time.findById(req.params.timeId, (error, result) => {
        timer.start();

        let today = new Date().toDateString();
        let lastTime = result.times[result.times.length-1];

        if(lastTime.date.slice(0, 15) == today){
            let timeHistory = lastTime.history;
            let historyLength = lastTime.history.length;

            if(timeHistory[historyLength-1]){
                let newHistory = {
                    startTimestamp: new Date(timer.startedAt()).toTimeString().slice(0, 8),
                    endTimestamp: new Date(timer.startedAt()).toTimeString().slice(0, 8),
                    start: timeHistory[historyLength-1].end,
                    end: timeHistory[historyLength-1].end
                }

                timeHistory.push(newHistory)

                let timeUpdate = {
                    date: lastTime.date,
                    timestampTotal: lastTime.timestampTotal.slice(0,8) + ' - ' + new Date(timer.startedAt()).toTimeString().slice(0, 8),
                    timeTotal: timeHistory[historyLength-1].end,
                    history: timeHistory
                }

                result.times[result.times.length-1] = timeUpdate
    
                Time.findByIdAndUpdate(req.params.timeId, {times: result.times}, {new: true}, (error, result) => {
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
        }
        else {
            let timesUpdate = result.times;

            let newTime = {
                date: new Date(timer.startedAt()).toDateString(),
                timestampTotal: new Date(timer.startedAt()).toTimeString().slice(0, 8) + ' - ' + new Date(timer.startedAt()).toTimeString().slice(0, 8),
                timeTotal: msToTime(timer.ms()),
                history: [
                    {
                        startTimestamp: new Date(timer.startedAt()).toTimeString().slice(0, 8),
                        endTimestamp: new Date(timer.startedAt()).toTimeString().slice(0, 8),
                        start: msToTime(timer.ms()),
                        end: msToTime(timer.ms())
                    }
                ]
            };

            timesUpdate.push(newTime);
        
            Time.findByIdAndUpdate(req.params.timeId, {times: timesUpdate}, {new: true}, (error, result) => {
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
    })
}

// Arrêter le time
exports.stopTime = (req, res) => {
    Time.findById(req.params.timeId, (error, result) => {
        if(timer.isRunning()){
            timer.stop();
          
            let today = new Date().toDateString();
            let lastTime = result.times[result.times.length-1];

                if(lastTime.date.slice(0, 15) == today){
                    let timeHistory = lastTime.history;
                    let historyLength = lastTime.history.length;

                    let newEnd = timeToMs(timeHistory[historyLength-1].end)+timer.ms()

                    if(timeHistory[historyLength-1]){
                        timeHistory[historyLength-1] = {
                            startTimestamp: timeHistory[historyLength-1].startTimestamp,
                            endTimestamp: new Date(timer.stoppedAt()).toTimeString().slice(0, 8),
                            start: timeHistory[historyLength-1].start,
                            end: msToTime(newEnd)
                        }

                        let timeUpdate = {
                            date: lastTime.date,
                            timestampTotal: lastTime.timestampTotal.slice(0,8) + ' - ' + new Date(timer.stoppedAt()).toTimeString().slice(0, 8),
                            timeTotal: msToTime(newEnd),
                            history: timeHistory
                        }

                        result.times[result.times.length-1] = timeUpdate
            
                        Time.findByIdAndUpdate(req.params.timeId, {times: result.times}, {new: true}, (error, result) => {
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
                }
                else{
                    let timeHistory = lastTime.history;
                    let historyLength = lastTime.history.length;

                    let newEnd = timeToMs(timeHistory[historyLength-1].end)+timer.ms()

                    if(timeHistory[historyLength-1]){
                        timeHistory[historyLength-1] = {
                            startTimestamp: timeHistory[historyLength-1].startTimestamp,
                            endTimestamp: new Date(timer.stoppedAt()).toTimeString().slice(0, 8),
                            start: timeHistory[historyLength-1].start,
                            end: msToTime(newEnd)
                        }

                        let timeUpdate = {
                            date: lastTime.date + " - " + new Date(timer.stoppedAt()).toDateString(),
                            timestampTotal: lastTime.timestampTotal.slice(0,8) + ' - ' + new Date(timer.stoppedAt()).toTimeString().slice(0, 8),
                            timeTotal: msToTime(newEnd),
                            history: timeHistory
                        }

                        result.times[result.times.length-1] = timeUpdate
            
                        Time.findByIdAndUpdate(req.params.timeId, {times: result.times}, {new: true}, (error, result) => {
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
                    
                }

        }
        else{
            res.status(500);
            res.json("Time n'a pas démarré");
        }
    });
}

// Afficher tous les times
exports.getAllTimes = (req, res) => {
    Time.find({}, (error, result) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Times non trouvés"});
        }
        else{
            res.status(200);
            res.json(result);
        }
    });
}

// Afficher un time par id
exports.getTimeById= (req, res) => {
    Time.findById(req.params.timeId, (error, result) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Time non trouvé"});
        }
        else{
            res.status(200);
            res.json(result);
        }
    });
}