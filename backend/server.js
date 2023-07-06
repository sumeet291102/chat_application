const express = require('express');
const app = express();

server = app.listen(8080, "0.0.0.0", () => {
  console.log('listening on 8000');
});

const socket_io = require("socket.io");
const io = socket_io(server, {
    cors: {
        origin: "*"
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