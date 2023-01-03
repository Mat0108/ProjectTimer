module.exports = (server) => {
    const userController = require("../controllers/userController");
    const cors = require('cors');


/**
 * @openapi
 * paths:
 *  /user/register:
 *   post:
 *     tags:
 *       - User
 *     description: API allowing the user to register for the first time on the web application.
 *     requestBody:
 *      content:
 *       application/json:
 *     responses:
 *       200:
 *         description: Utilisateur crée.
 */
server.post("/user/register", cors(), userController.userRegister);

/**
 * @openapi
 * paths:
 *  /user/login:
 *   post:
 *     tags:
 *       - User
 *     description: API allowing the user to connect
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.post("/user/login", cors(), userController.userLogin);

/**
 * @openapi
 * paths:
 *  /user/logout/:userId:
 *   post:
 *     tags:
 *       - User
 *     description: Api allowing the user to disconnect and to confirm this disconnection.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.post("/user/logout/:userId", cors(), userController.userLogout);

/**
 * @openapi
 * paths:
 *  /users:
 *   get:
 *     tags:
 *       - User
 *     description: Api to retrieve a list of users.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.get("/users", cors(), userController.getAllUsers);

/**
 * @openapi
 * paths:
 *  /users/:userId:
 *   get:
 *     tags:
 *       - User
 *     description: Api allowing to retrieve a user by his Id.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
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
 *       - User
 *     description: Modification of user information by Id.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
.put(userController.updateUser)

/**
 * @openapi
 * paths:
 *  /users/:userId:
 *   delete:
 *     tags:
 *       - User
 *     description: Api to delete a user.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
.delete(userController.deleteUser)

/**
 * @openapi
 * paths:
 *  /users/:userId:
 *   patch:
 *     tags:
 *       - User
 *     description: Modification of user information.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
.patch(userController.patchUser);
}