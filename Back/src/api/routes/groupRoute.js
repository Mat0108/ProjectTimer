module.exports = (server) => {
    const groupController = require("../controllers/groupController");
    const cors = require('cors');
    

    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

/**
 * @openapi
 * paths:
 *  /group:
 *   post:
 *     tags:
 *       - Group
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/**
 * @openapi
 * paths:
 *  /groupsbyUser:
 *   post:
 *     tags:
 *       - Group
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.post("/group", cors(), groupController.createGroup);

/**
 * @openapi
 * paths:
 *  /groups:
 *   get:
 *     tags:
 *       - Group
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.get("/groups", cors(), groupController.getAllGroups);

/**
 * @openapi
 * paths:
 *  /groups/:groupId:
 *   get:
 *     tags:
 *       - Group
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

server.route("/groups/:groupId")
.all(cors())
.get(groupController.getGroupById)

/**
 * @openapi
 * paths:
 *  /groups/:groupId:
 *   patch:
 *     tags:
 *       - Group
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
.patch(groupController.addUsers)

/**
 * @openapi
 * paths:
 *  /groups/:groupId:
 *   delete:
 *     tags:
 *       - Group
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
.delete(groupController.deleteGroupById);

/**
 * @openapi
 * paths:
 *  /groups/:groupId/deleteUsers:
 *   patch:
 *     tags:
 *       - Group
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.patch("/groups/:groupId/deleteUsers", cors(), groupController.deleteUsers)
}