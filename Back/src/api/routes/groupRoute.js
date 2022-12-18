module.exports = (server) => {
    const groupController = require("../controllers/groupController");
    const cors = require('cors');

server.post("/group/:userId", cors(), groupController.createGroup);

server.get("/groups", cors(), groupController.getAllGroups);

server.route("/groups/:groupId")
.all(cors())
.get(groupController.getGroupById)
.post(groupController.addUser)
.delete(groupController.deleteGroup);

}