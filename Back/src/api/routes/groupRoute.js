module.exports = (server) => {
    const groupController = require("../controllers/groupController");
    const cors = require('cors');
    


/**
 * @openapi
 * paths:
 *  /group:
 *   post:
 *     tags:
 *       - Group
 *     description: get group by id
 *     parameters:
 *      - in: params
 *        name: groupId
 *        description: id of group
 *        schema:
 *          type: String
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
 *     description: Get all groups
 *     responses:
 *       200:
 *         description: Returns all group.
 */
server.get("/groups", cors(), groupController.getAllGroups);

server.route("/groups/:groupId")
.all(cors())
/**
 * @openapi
 * paths:
 *  /groups/:groupId:
 *   get:
 *     tags:
 *       - Group
 *     description: get group by id
 *     parameters:
 *      - in: params
 *        name: groupId
 *        description: id of group
 *        schema:
 *          type: String
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
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
/**
 * @openapi
 * paths:
 *  /groupsbyUser
 *   patch:
 *     tags:
 *       - Group
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.post("/groupsbyUser", cors(), groupController.getGroupByUser)
}
