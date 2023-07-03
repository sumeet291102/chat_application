import React from 'react'
import {socket} from './App';

function ChatMessage(props) {
  console.log(props);
  return (
    <div style = { (props.message.socket_id===socket.id) ? {marginLeft: "auto"} : {}} className="chat_message">
      <p>{props.message.content}</p>
    </div>
  )
}

export default ChatMessage;
