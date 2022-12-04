module.exports = (server) => {
    const userController = require("../controllers/userController");
    const cors = require('cors');

server.post("/user/register", cors(), userController.userRegister);
server.post("/user/login", cors(), userController.userLogin);
server.post("/user/logout/:userId", cors(), userController.userLogout);
}