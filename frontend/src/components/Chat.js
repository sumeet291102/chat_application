import {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { MoreVert, SearchOutlined } from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {socket} from '../App.js';



function Chat(props) {

  const [new_message, set_new_message] = useState("");

  const handle_submit = (evt) => {
    evt.preventDefault();
    socket.emit("new_chat", {content:new_message, socket_id:socket.id, room_name:props.room.room_name, user_name:props.user_name});
    set_new_message("");
  }

  const handle_change = (evt) => {
    set_new_message(evt.target.value);
  }


  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar><img src={props.room.room_image} alt="profile pic"></img></Avatar>
        <div className="chat_header_right">
          <div className="chat_header_right_info">
              <p><strong>{props.room.room_name}</strong></p>
              <p>Last seen: {props.room.last_seen}</p>
          </div>
          <div className="chat_header_right_icon">
            <IconButton className="icon-white"><SearchOutlined /></IconButton>
            <IconButton className="icon-white"><MoreVert /></IconButton>
          </div>
        </div>
      </div>


      <div className="chat_content">
        {
          props.room.messages.map((message,idx) => {
            return(<ChatMessage 
              message={message}
              key={idx}
            />)
          })
        }
      </div> 

      
      <div className="new_chat">
          <form className="new_chat_container" onSubmit={handle_submit}>
            <IconButton><AttachFileIcon /></IconButton>
            <div className="new_chat_input">
              <input 
                type="text"
                name="chat_content"
                value={new_message}
                onChange={handle_change}
                placeholder="type a message"/>
            </div>
            <IconButton type="submit"><SendIcon /></IconButton>
          </form>
      </div> 
    </div>
  )
}

export default Chat;