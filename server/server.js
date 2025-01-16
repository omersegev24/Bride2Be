require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const logger = require("morgan");
const cors = require("cors");
const socketHandler = require("./socketHandler");

const PORT = process.env.PORT || 8080;

const { usersRouter } = require("./routers/usersRouter");
const { messagesRouter } = require("./routers/messagesRouter");
const { checklistRouter } = require("./routers/checkListsRouter");
const vendorsRouter = require("./routers/vendorsRouter");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

socketHandler(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.set("Content-Type", "application/json");
    next();
});

app.use("/api/users", usersRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/checklist', checklistRouter);
app.use("/api/vendors", vendorsRouter);

app.use((req, res) => {
    res.status(400).send("Page wasn't found");
});

server.listen(PORT, () => {
    console.log(`Express Server listening on port ${PORT}`);
});