module.exports = (server) => {
    const groupController = require("../controllers/groupController");
    const cors = require('cors');

server.post("/group/:userId", cors(), groupController.createGroup);

server.route("/group/:groupId")
.all(cors())
.get(groupController.getGroup)
.post(groupController.addUser)
.delete(groupController.deleteGroup);

}