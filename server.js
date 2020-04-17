const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to sprint challenge");
});

const hostName = process.env.hostName || "21.0.0.1";
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on ${hostName}:${PORT}`);
});
