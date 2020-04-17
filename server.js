const express = require("express");
const actionRouter = require("./routers/actionRouter");

const server = express();

server.use(express.json());

server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Node Sprint Challange</h1>`);
});

const hostName = process.env.hostName || "21.0.0.1";
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on ${hostName}:${PORT}`);
});
