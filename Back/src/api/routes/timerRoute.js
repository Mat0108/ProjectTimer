module.exports = (server) => {
    const timerController = require("../controllers/timerController");
    const cors = require('cors');

server.post("/timer", cors(), timerController.startTimer);

server.patch("/timers/:timerId/pause", cors(), timerController.pauseTimer);
server.patch("/timers/:timerId/resume", cors(), timerController.resumeTimer);
server.patch("/timers/:timerId/stop", cors(), timerController.stopTimer);

}