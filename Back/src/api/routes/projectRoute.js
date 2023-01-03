module.exports = (server) => {
    const projectController = require("../controllers/projectController");
    const cors = require('cors');


/**
 * @openapi
 * paths:
 *  /project:
 *   post:
 *     tags:
 *       - Project
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.post("/project", cors(), projectController.createProject);

/**
 * @openapi
 * paths:
 *  /projects:
 *   get:
 *     tags:
 *       - Project
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.get("/projects", cors(), projectController.getAllProjects);

server.route("/projects/:projectId")
.all(cors())

/**
 * @openapi
 * paths:
 *  /projects/:projectId:
 *   get:
 *     tags:
 *       - Project
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
.get(projectController.getProjectById)

/**
 * @openapi
 * paths:
 *  /projects/:projectId:
 *   patch:
 *     tags:
 *       - Project
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
.patch(projectController.addGroups)

/**
 * @openapi
 * paths:
 *  /projects/:projectId:
 *   delete:
 *     tags:
 *       - Project
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
.delete(projectController.deleteProjectById);

/**
 * @openapi
 * paths:
 *  /projects/:projectId/deleteGroups:
 *   patch:
 *     tags:
 *       - Project
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.patch("/projects/:projectId/deleteGroups", cors(), projectController.deleteGroups)

/**
 * @openapi
 * paths:
 *  /projects/:projectId/updateTimer:
 *   patch:
 *     tags:
 *       - Project
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
server.patch("/projects/:projectId/updateTimer", cors(), projectController.updateTimer);
}