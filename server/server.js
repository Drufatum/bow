const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("client"));

io.on("connection", (socket) => {
  console.log("有玩家連線");

  socket.on("move", (data) => {
    socket.broadcast.emit("move", data);
  });
});

server.listen(PORT, () => {
  console.log(`伺服器正在 ${PORT} 埠口運行`);
});