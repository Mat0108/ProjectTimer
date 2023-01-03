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
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.post("/user/register", cors(), userController.userRegister);

/**
 * @openapi
 * paths:
 *  /user/login:
 *   post:
 *     tags:
 *       - User
 *     description: Welcome to swagger-jsdoc!
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
 *     description: Welcome to swagger-jsdoc!
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
 *     description: Welcome to swagger-jsdoc!
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
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.route("/users/:userId")
.all(cors())


.get(userController.getUserById)
.put(userController.updateUser)
.delete(userController.deleteUser)
.patch(userController.patchUser);
}