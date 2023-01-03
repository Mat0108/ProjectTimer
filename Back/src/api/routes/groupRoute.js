module.exports = (server) => {
    const groupController = require("../controllers/groupController");
    const cors = require('cors');
    



server.post("/group", cors(), groupController.createGroup);

server.get("/groups", cors(), groupController.getAllGroups);

server.get("/groups/getbyName",cors(),groupController.getGroupByUser)

server.route("/groups/:groupId")
.all(cors())
.get(groupController.getGroupById)
.patch(groupController.addUsers)
.delete(groupController.deleteGroupById);

server.patch("/groups/:groupId/deleteUsers", cors(), groupController.deleteUsers)
}