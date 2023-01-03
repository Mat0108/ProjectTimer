module.exports = (server) => {
    const userController = require("../controllers/userController");
    const cors = require('cors');


/**
 * @openapi
 * paths:
 *  /user/register:
 *   post:
 *     tags:
 *      - User
 *     description: API allowing the user to register for the first time on the web application
 *     parameters:
 *      - in: params
 *        name: firstname
 *        schema:
 *          type: string
 *      - in: params
 *        name: lastname
 *        schema:
 *          type: string
 *      - in: params
 *        name: email
 *        schema:
 *          type: string
 *      - in: params
 *        name: password
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Created user
 */
server.post("/user/register", cors(), userController.userRegister);

/**
 * @openapi
 * paths:
 *  /user/login:
 *   post:
 *     tags:
 *      - User
 *     description: 
 *     parameters:
 *      - in: body
 *        name: email
 *        schema:
 *          type: string
 *      - in: body
 *        name: password
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Connection user
 */
server.post("/user/login", cors(), userController.userLogin);

/**
 * @openapi
 * paths:
 *  /user/logout/:userId:
 *   post:
 *     tags:
 *      - User
 *     description: User disconnection by Id
 *     parameters:
 *      - in: params
 *        name: userId
 *        schema:
 *          type: string
 *      - in: body
 *        name: message
 *        description: Message confirmed the logout
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: User disconnection
 */
server.post("/user/logout/:userId", cors(), userController.userLogout);

/**
 * @openapi
 * paths:
 *  /users:
 *   get:
 *     tags:
 *      - User
 *     description: Get all users
 *     parameters:
 *      - in: params
 *        name: users
 *        description: List all of users
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns all users
 */
server.get("/users", cors(), userController.getAllUsers);

/**
 * @openapi
 * paths:
 *  /users/:userId:
 *   get:
 *     tags:
 *      - User
 *     description: Get user by Id
 *     parameters:
 *      - in: params
 *        name: userId
 *        description: Get user by Id
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns user by Id
 */
server.route("/users/:userId")
.all(cors())


.get(userController.getUserById)



/**
 * @openapi
 * paths:
 *  /users/:userId:
 *   put:
 *     tags:
 *      - User
 *     description: Modification of user information by Id
 *     parameters:
 *      - in: params
 *        name: userId
 *        description: user Id
 *        schema:
 *          type: string
 *      - in: body
 *        name: id
 *        description: user Id
 *        schema:
 *          type: string
 *      - in: body
 *        name: firstname
 *        description: user firstname
 *        schema:
 *          type: string
 *      - in: body
 *        name: lastname
 *        description: user lastname
 *        schema:
 *          type: string
 *      - in: body
 *        name: email
 *        description: user email
 *        schema:
 *          type: string
 *      - in: body
 *        name: password
 *        description: user password
 *        schema:
 *          type: string
 *      - in: body
 *        name: connected
 *        description: user connected
 *        schema:
 *          type: boolean
 *      - in: body
 *        name: groups
 *        description: Groups to which the user belongs
 *        schema:
 *          type: array
 *      - in: body
 *        name: projects
 *        description: Projects to which the user belongs
 *        schema:
 *          type: array
 *     responses:
 *       200:
 *         description: Return a succes message
 */
.put(userController.updateUser)



/**
 * @openapi
 * paths:
 *  /users/:userId:
 *   delete:
 *     tags:
 *      - User
 *     description: Api to delete a user
 *     parameters:
 *      - in: params
 *        name: userId
 *        description: Delete user by Id
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: User supprimé
 */
.delete(userController.deleteUser)

/**
 * @openapi
 * paths:
 *  /users/:userId:
 *   patch:
 *     tags:
 *      - User
 *     description: Modification of user information
 *     responses:
 *       200:
 *         description: Return a succes message
 */
.patch(userController.patchUser);
}