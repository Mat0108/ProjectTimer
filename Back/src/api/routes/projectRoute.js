module.exports = (server) => {
    const projectController = require("../controllers/projectController");
    const cors = require('cors');

/**
 * @openapi
 * paths:
 *  /project:
 *   post:
 *     tags:
 *      - Project
 *     description: Creation of project with an admin
 *     parameters:
 *      - in: body
 *        name: name
 *        description: Name of project
 *        schema:
 *          type: string
 *      - in: body
 *        name: email
 *        description: Mail of admin of project
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns project created
 */
server.post("/project", cors(), projectController.createProject);

/**
 * @openapi
 * paths:
 *  /projects:
 *   get:
 *     tags:
 *      - Project
 *     description: Get all projects
 *     responses:
 *       200:
 *         description: Returns a list of all project
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
 *      - Project
 *     description: Get a project by Id
 *     parameters:
 *      - in: params
 *        name: projectId
 *        description: project id
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Return a project
 */
.get(projectController.getProjectById)

/**
 * @openapi
 * paths:
 *  /projects/:projectId:
 *   patch:
 *     tags:
 *      - Project
 *     description: Add groups in project
 *     parameters:
 *      - in: params
 *        name: projectId
 *        description: project Id
 *        schema:
 *          type: string
 *      - in: body
 *        name: admin
 *        description: The user who add group in project
 *        schema:
 *          type: string
 *      - in: body
 *        name: groups
 *        description: list of groups 
 *        schema:
 *          type: array
 *     responses:
 *       200:
 *         description: Returns a list
 */
.patch(projectController.addGroups)

/**
 * @openapi
 * paths:
 *  /projects/:projectId:
 *   delete:
 *     tags:
 *      - Project
 *     description: Delete project
 *     parameters:
 *      - in: params
 *        name: projectId
 *        description: Project id
 *        schema:
 *          type: string
 *      - in: body
 *        name: admin
 *        description: The user who add created project
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns a succes message
 */
.delete(projectController.deleteProjectById);

/**
 * @openapi
 * paths:
 *  /projects/:projectId/deleteGroups:
 *   patch:
 *     tags:
 *      - Project
 *     description: Delete groups in project
 *      parameters:
 *      - in: params
 *        name: projectId
 *        description: Project id
 *        schema:
 *          type: string
 *      - in: body
 *        name: admin
 *        description: The user who add created project
 *        schema:
 *          type: string
 *      - in: body
 *        name: groups
 *        description: List of groups in project
 *        schema:
 *          type: array
 *     responses:
 *       200:
 *         description: Returns a succes message
 */
server.patch("/projects/:projectId/deleteGroups", cors(), projectController.deleteGroups)

/**
 * @openapi
 * paths:
 *  /projects/:projectId/updateTimer:
 *   patch:
 *     tags:
 *      - Project
 *     description: Modification of Timer
 *     parameters:
 *      - in: params
 *        name: projectId
 *        description: Project id
 *        schema:
 *          type: string
 *      - in: body
 *        name: admin
 *        description: The user who has created project
 *        schema:
 *          type: string
 *      - in: body
 *        name: groups
 *        description: List of groups in project
 *        schema:
 *          type: array
 *     responses:
 *       200:
 *         description: Returns a succes message
 */
server.patch("/projects/:projectId/updateTimer", cors(), projectController.updateTimer);
}