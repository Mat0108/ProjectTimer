module.exports = (server) => {
    const projectController = require("../controllers/projectController");
    const cors = require('cors');

server.post("/project/create", cors(), projectController.CreateProject);


}