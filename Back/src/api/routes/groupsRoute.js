module.exports = (server) => {
    const groupsController = require("../controllers/groupsController");
    const cors = require('cors');

server.post("/group/create", cors(), groupsController.CreateGroups);
server.get("/group/:groupId",cors(),groupsController.getGroup);
server.post("/group/:groupId/add",cors(),groupsController.addUser);
server.delete("/group/:groupId",cors(),groupsController.deleteGroup);

}