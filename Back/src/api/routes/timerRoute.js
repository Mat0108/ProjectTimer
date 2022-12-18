module.exports = (server) => {
    const timerController = require("../controllers/timerController");
    const cors = require('cors');

server.post("/timer", cors(), timerController.startTimer);

}