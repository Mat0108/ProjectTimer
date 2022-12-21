module.exports = (server) => {
    const timeController = require("../controllers/timeController");
    const cors = require('cors');

server.get("/times", cors(), timeController.getAllTimes);
server.get("/times/:timeId", cors(), timeController.getTimeById);

server.post("/time", cors(), timeController.startTime);
server.patch("/times/:timeId/stop", cors(), timeController.stopTime);
server.patch("/times/:timeId/continue", cors(), timeController.continueTime);
}