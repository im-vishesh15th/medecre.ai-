import React from 'react'
import { useState,useCallback } from 'react'
import { useNavigate } from 'react-router-dom'


const VideoCallJoin = () => {
    const navigate=useNavigate();
  const[roomId,setRoomId]=useState(null);
 const handleJoinRoom =useCallback(()=>{
    navigate(`/call/${roomId}`);

 },[navigate,roomId]);

  return (
    <div>
      <input  value={roomId} onChange={(e)=>setRoomId(e.target.value)} placeholder='RoomId'/>
      <button onClick={()=>handleJoinRoom()}>Join</button>
    </div>
  )
}

export default VideoCallJoin
