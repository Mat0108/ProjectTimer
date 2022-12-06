module.exports = (server) => {
    const userController = require("../controllers/userController");
    const cors = require('cors');

server.post("/user/register", cors(), userController.userRegister);
server.post("/user/login", cors(), userController.userLogin);
server.post("/user/logout/:userId", cors(), userController.userLogout);

server.get("/users", cors(), userController.listAllUsers);
server.get("/user/:userId", cors(), userController.aUser);
server.put("/user/:userId", cors(), userController.updateUser);
server.delete("/user/:userId", cors(), userController.deleteUser);
server.patch("/user/:userId", cors(), userController.patchUser);
}