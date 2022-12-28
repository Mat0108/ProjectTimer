module.exports = (server) => {
    const projectController = require("../controllers/projectController");
    const cors = require('cors');

server.post("/project", cors(), projectController.createProject);

server.get("/projects", cors(), projectController.getAllProjects);

server.route("/projects/:projectId")
.all(cors())
.get(projectController.getProjectById)
.patch(projectController.addGroups)
.delete(projectController.deleteProjectById);

server.patch("/projects/:projectId/deleteGroups", cors(), projectController.deleteGroups)

server.patch("/projects/:projectId/updateTimer", cors(), projectController.updateTimer);
}