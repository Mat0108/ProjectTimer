module.exports = (server) => {
    const timeController = require("../controllers/timeController");
    const cors = require('cors');

server.get("/times", cors(), timeController.getAllTimes);

server.route("/times/:timeId")
.all(cors())
.get(timeController.getTimeById)
.delete(timeController.deleteTimeById);

server.post("/time", cors(), timeController.startTime);
server.patch("/times/:timeId/stop", cors(), timeController.stopTime);
server.patch("/times/:timeId/continue", cors(), timeController.continueTime);
}