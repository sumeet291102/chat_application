import {useState, useEffect } from "react"
import Sidebar from './components/Sidebar.js';
import Chat from './components/Chat.js';
import PopUp from './components/PopUp.js';
import io from "socket.io-client";


export const socket = io.connect("https://chat-app-pd1k.onrender.com/", { extraHeaders: {
  'Access-Control-Allow-Origin': '*'
  } });


function App() {

  const timestamp = new Date().toLocaleTimeString();

  const [rooms, set_rooms] = useState([{room_name:"common room", room_image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/675px-Black_colour.jpg?20170110114905", last_seen:timestamp, messages:[]}]);

  const [user_name, set_user_name] = useState("");


  const [curr_id, set_curr_id] = useState(0);

  const handle_clicked = (id) => {
    set_curr_id(id);
  }
  

  const handle_user_name = (ele) => {
    set_user_name(ele);
  }

  setTimeout(() => {
    rooms.forEach((room, idx) => {
      if(idx===curr_id) document.querySelector(`.sidebarRoom:nth-child(${idx+1})`).style.backgroundColor="rgb(136, 141, 165)";
      else document.querySelector(`.sidebarRoom:nth-child(${idx+1})`).style.backgroundColor="transparent";
    })
  },10);


  useEffect(() => {
    socket.on("join_room", (data) => {

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
        rooms={rooms}
        clicked={handle_clicked}
      />
      <Chat
        room={rooms[curr_id]}
        user_name={user_name}
      />
      <PopUp
        user_name={handle_user_name}
      />
    </div>
  );
}


export default App;




