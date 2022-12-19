module.exports = (server) => {
    const projectController = require("../controllers/projectController");
    const jwtMiddleware = require("../middlewares/jwtMiddleware");
    const cors = require('cors');

    server.post("/project/:groupId", cors(), projectController.createProject);

    server.get("/projects", cors(), projectController.getAllProjects);
    
    server.route("/projects/:projectId")
    .all(cors())
    .get(projectController.getProjectById)
    .patch(jwtMiddleware.authenticate,projectController.addGroups)
    .delete(jwtMiddleware.authenticate, projectController.deleteProjectById);
    
    server.patch("/projects/:projectId/deleteGroups", jwtMiddleware.authenticate, cors(), projectController.deleteGroups)
    }