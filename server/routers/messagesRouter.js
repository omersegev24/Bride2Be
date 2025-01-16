const { Router } = require("express");
const { getAllMessages } = require("../controllers/messagesController");

const messagesRouter = new Router();

messagesRouter.get("/", getAllMessages);

module.exports = { messagesRouter };
