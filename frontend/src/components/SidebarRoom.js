import React from 'react'
import Avatar from '@mui/material/Avatar';

function SidebarRoom(props) {

  const handle_click = () => {
    props.clicked(props.id);
  }

  return (
    <div onClick={handle_click} className="sidebarRoom">
      <div className="sidebarRoom_img">
        <Avatar><img src={props.room_image} alt="" /></ Avatar>
      </div>
      <div className="sidebarRoom_content">
        <p><strong>{props.room_name}</strong></p>
        <p>{props.last_seen}</p>
      </div>
    </div>
  )
}

export default SidebarRoom;