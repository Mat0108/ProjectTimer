module.exports = (server) => {
    const timeController = require("../controllers/timeController");
    const cors = require('cors');


/**
 * @openapi
 * paths:
 *  /times:
 *   get:
 *     tags:
 *       - Timer
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.get("/times", cors(), timeController.getAllTimes);

server.route("/times/:timeId")
.all(cors())

/**
 * @openapi
 * paths:
 *  /times/:timeId:
 *   get:
 *     tags:
 *       - Timer
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
.get(timeController.getTimeById)

/**
 * @openapi
 * paths:
 *  /times/:timeId:
 *   delete:
 *     tags:
 *       - Timer
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
.delete(timeController.deleteTimeById);

/**
 * @openapi
 * paths:
 *  /time:
 *   post:
 *     tags:
 *       - Timer
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.post("/time", cors(), timeController.startTime);

/**
 * @openapi
 * paths:
 *  /times/:timeId/stop:
 *   patch:
 *     tags:
 *       - Timer
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.patch("/times/:timeId/stop", cors(), timeController.stopTime);

/**
 * @openapi
 * paths:
 *  /times/:timeId/continue:
 *   patch:
 *     tags:
 *       - Timer
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.patch("/times/:timeId/continue", cors(), timeController.continueTime);
}