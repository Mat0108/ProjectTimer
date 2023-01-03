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
 *     description: Get all timers
 *     responses:
 *       200:
 *         description: Return a succes message.
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
 *     description: Get time by Id
 *     parameters:
 *      - in: params
 *        name: timeId
 *        description: timeId
 *        schema:
 *          type: array
 *     responses:
 *       200:
 *         description: Returns a succes message.
 */
.get(timeController.getTimeById)

/**
 * @openapi
 * paths:
 *  /times/:timeId:
 *   delete:
 *     tags:
 *       - Timer
 *     description: Delete time by Id
 *     parameters:
 *      - in: params
 *        name: timeId
 *        description: timeId
 *        schema:
 *          type: array
 *     responses:
 *       200:
 *         description: Returns a succes message.
 */
.delete(timeController.deleteTimeById);

/**
 * @openapi
 * paths:
 *  /time:
 *   post:
 *     tags:
 *       - Timer
 *     parameters:
 *      - in: body
 *        name: name
 *        description: Task
 *        schema:
 *          type: string
 *      - in: body
 *        name: user
 *        description: The user who creates the project.
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Return a succes message.
 */
server.post("/time", cors(), timeController.startTime);

/**
 * @openapi
 * paths:
 *  /times/:timeId/stop:
 *   patch:
 *     tags:
 *       - Timer
 *     parameters:
 *      - in: params
 *        name: timeId
 *        description: Time id
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Return a succes message.
 */
server.patch("/times/:timeId/stop", cors(), timeController.stopTime);

/**
 * @openapi
 * paths:
 *  /times/:timeId/continue:
 *   patch:
 *     tags:
 *       - Timer
 *     parameters:
 *      - in: params
 *        name: timeId
 *        description: TimeId
 *        schema:
 *          type: string
 *      - in: body
 *        name: user
 *        description: The user who creates the project.
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Return a succes message.
 */
server.patch("/times/:timeId/continue", cors(), timeController.continueTime);
}