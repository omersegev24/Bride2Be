const { Router } = require("express");
const { registerUser, loginUser, updateCompletedTask, getUserById } = require("../controllers/usersController");

const usersRouter = new Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.post("/:userId/updateTask", updateCompletedTask);
usersRouter.get("/:userId", getUserById);

module.exports = { usersRouter };
