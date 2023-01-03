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
 *      - in: body
 *        name: name
 *        description: name of group
 *        schema:
 *          type: string
 *      - in: body
 *        name: admin
 *        description: mail of admin of group
 *        schema:
 *          type: string
 *      - in: body
 *        name: users
 *        description: list of mails of the group users
 *        schema:
 *          type: array
 *     responses:
 *       200:
 *         description: Returns group created.
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
 *        name: group id
 *        description: group id
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns group.
 */
.get(groupController.getGroupById)

/**
 * @openapi
 * paths:
 *  /groups/:groupId:
 *   patch:
 *     tags:
 *       - Group
 *     description: Add list of user to group
 *     parameters:
 *      - in: params
 *        name: group id
 *        description: group id
 *        schema:
 *          type: string
 *      - in: body
 *        name: users
 *        description: list of users 
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: return a succes message.
 */
.patch(groupController.addUsers)

/**
 * @openapi
 * paths:
 *  /groups/:groupId:
 *   delete:
 *     tags:
 *       - Group
 *     description: delete group
 *     parameters:
 *      - in: params
 *        name: group id
 *        description: group id
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns a succes message.
 */
.delete(groupController.deleteGroupById);

/**
 * @openapi
 * paths:
 *  /groups/:groupId/deleteUsers:
 *   patch:
 *     tags:
 *       - Group
 *     description: Remove list of users to group
 *     parameters:
 *      - in: params
 *        name: group id
 *        description: group id
 *        schema:
 *          type: string
 *      - in: body
 *        name: users
 *        description: list of users 
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns a  string.
 */
server.patch("/groups/:groupId/deleteUsers", cors(), groupController.deleteUsers)

/**
 * @openapi
 * paths:
 *  /groupsbyUser:
 *   post:
 *     tags:
 *       - Group
 *     description: return all groups containing the email in the user list or in the admin 
 *     parameters:
 *      - in: body
 *        name: email
 *        description: mail of user 
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns a list of groups.
 */
server.post("/groupsbyUser", cors(), groupController.getGroupByUser)
}
