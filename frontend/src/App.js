import {useState, useEffect } from "react"
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import io from "socket.io-client"


export const socket = io.connect("https://chat-app-pd1k.onrender.com/");


function App() {

  const timestamp = new Date().toLocaleTimeString();

  const [rooms, set_rooms] = useState([{room_name:"common room", room_image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/675px-Black_colour.jpg?20170110114905", last_seen:timestamp, messages:[]}]);


  const handle_curr_room = (curr_room_data) => {
    console.log(curr_room_data.id);
    console.log(curr_room_data.name);
  }

  const [curr_id, set_curr_id] = useState(0);

  const handle_clicked = (id) => {
    set_curr_id(id);

  }
  
  setTimeout(() => {
    rooms.forEach((room, idx) => {
      if(idx===curr_id) document.querySelector(`.sidebarRoom:nth-child(${idx+1})`).style.backgroundColor="rgb(150, 150, 150)";
      else document.querySelector(`.sidebarRoom:nth-child(${idx+1})`).style.backgroundColor="transparent";
    })
  },10);

  useEffect(() => {
    socket.on("join_room", (data) => {
      console.log(data.room_name);

      let flag=1;

      rooms.forEach((room) => {
        if(room.room_name.localeCompare(data.room_name)===0) flag=0;
      })

      if(flag===1) {
        set_rooms([...rooms, {
          room_name: data.room_name,
          room_image: data.room_image,
          last_seen: timestamp,
          messages:[]
        }])

      }
    })

    return () => {
      socket.off("join_room");
    }
  })
  

  useEffect(() => {
    socket.on("new_chat", (data) => {
      const new_rooms = rooms.map((room) => {
        if(room.room_name===data.room_name) return {
          ...room,
          last_seen: timestamp,
          messages: [...room.messages, data]
        }
        else return {
          ...room
        }
      })

      set_rooms(new_rooms);
    })

    return () => {
      socket.off("new_chat");
    }
  })


  return (
    <div className="app">
      <Sidebar 
        curr_room={handle_curr_room}
        rooms={rooms}
        clicked={handle_clicked}
      />
      <Chat
        room={rooms[curr_id]}
      />
    </div>
  );
}


export default App;




