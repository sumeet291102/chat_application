const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

server = app.listen(port, () => {
  console.log(`listening on ${port}`);
});

const socket_io = require("socket.io");
const io = socket_io(server, {
    cors: {
        origin: "*",
        "Access-Control-Allow-Origin": "*"
    }
});

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);

  //handle kiya hai join request...
  socket.on("join_room", (data) => {
    socket.join(data.room_name);
    io.to(data.room_name).emit("join_room", data);
    console.log(data);
  })

  socket.on("new_chat", (data) => {
    io.emit("new_chat", data);
    console.log(data);
  })

});