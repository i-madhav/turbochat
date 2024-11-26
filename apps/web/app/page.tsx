'use client'

import { useState } from "react";
import { useSocket } from "../context/SocketProvider"

export default function page(){
  const {sendMessage} = useSocket();
  const[messages , setMessages] = useState("")
  return(
    <div>
      <div>
        <h1>mesaages here</h1>
      </div>

      <div>
        <input type="text" placeholder="enter message" onChange={(e) => setMessages(e.target.value)}/>
        <button onClick={() => sendMessage(messages)}>send</button>
      </div>
    </div>
  )
}