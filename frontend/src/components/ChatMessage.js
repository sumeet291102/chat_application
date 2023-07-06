import React from 'react'
import {socket} from '../App.js';

function ChatMessage(props) {
  console.log(props);
  return (
    <div style = { (props.message.socket_id===socket.id) ? {marginLeft: "auto"} : {}} className="chat_message">
      {(props.message.socket_id!==socket.id) && <p style = {{marginRight: "8px"}}>{props.message.user_name}:</p>}
      <p>{props.message.content}</p>
    </div>
  )
}

export default ChatMessage;
