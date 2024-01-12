import React, { useEffect, useRef, useState } from 'react'
import './MessageForm.css'
import MessageInput from './MessageInput';
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../services/allAPI';
function MessageForm({currentChat, currentUser,socket}) {
    const [messages,setMessages] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const scrollRef = useRef()
    console.log(currentChat);
    const getMessages = async ()=>{
       if(currentChat){ const response = await axios.post(getAllMessagesRoute,{
            from: currentUser._id,
            to: currentChat._id
        })
        console.log(response);
        setMessages(response.data)}
    }
    useEffect(()=>{
        getMessages()
    },[currentChat])

   const handleMsgSend = async (msg)=>{
    await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to:currentChat._id,
        message: msg
    })
    socket.current.emit("send-msg",{
        to: currentChat._id,
        from: currentUser._id,
        message: msg
    })

   
    console.log("Message sent:", msg);
    const msgs = [...messages]
    msgs.push({fromSelf:true, message:msg})
    setMessages(msgs)
    console.log(messages);
   }

   useEffect(()=>{
    if(socket.current){
        socket.current.on("connect", () => {
        });
        socket.current.on("msg-recieve",(msg)=>{
            setArrivalMessage({fromSelf:false, message:msg})
        })
    }
   },[])

   useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage])
   },[arrivalMessage])

   useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
   },[messages])

  return (
   <>
       { currentChat &&
        (<div className='msg-container'>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                    <img src={`data:image/svg+xml;base64, ${currentChat.profilePic}`} alt="" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message)=>{
                        return (
                            <div>
                            
                                <div className={`message ${message.fromSelf ? "send":"recieved"}`}>
                                    <div className="content">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div ref={scrollRef}></div>
            </div>
        <MessageInput handleMsgSend = {handleMsgSend} />
        </div>)}
   </>
  )
}

export default MessageForm