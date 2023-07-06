import {useState} from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import SidebarRoom from "./SidebarRoom.js";
import {socket} from '../App.js';


function Sidebar(props) {
  const [new_room_name, set_new_room_name] = useState("");

  const handle_change = (evt) => {
    set_new_room_name(evt.target.value);
  }

  const handle_submit = (evt) => {
    evt.preventDefault();
    const url = `https://avatars.dicebear.com/api/adventurer/${Math.random()}.svg`;
    socket.emit("join_room", {room_name:new_room_name, room_image:url});
    set_new_room_name("");
  }

  const handle_clicked = (id) => {
    props.clicked(id);
  }
  
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_header_left">
          <Avatar><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/675px-Black_colour.jpg?20170110114905" alt="profile"></img></Avatar>
        </div>
        <div className="sidebar_header_right">
          <IconButton className="icon-white"><DonutLargeIcon className="status_icon"/></IconButton>
          <IconButton className="icon-white"><ChatIcon className="chat_icon"/></IconButton>
          <IconButton className="icon-white"><MoreVertIcon className="3dot_icon"/></IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <form onSubmit={handle_submit} className="sidebar_search_container">
          <IconButton><SearchIcon /></IconButton>
          <input onChange={handle_change} value={new_room_name} placeholder="search"></input>
        </form>
      </div>

      <div className="sidebar_content">
        <div className="sidebar_content_container">
          {
            props.rooms.map((room,idx) => {
              return(<SidebarRoom
                key={idx}
                id={idx}
                room_name={room.room_name}
                room_image={room.room_image}
                last_seen={room.last_seen}
                clicked={handle_clicked}
              />)
            })
          }
        </div>
      </div>
    </div>
  )
}
  
export default Sidebar;