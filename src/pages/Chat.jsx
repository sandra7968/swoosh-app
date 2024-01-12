import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import { allUsersAPI } from '../services/allAPI'
import axios from 'axios'
import './Chat.css'
import LandingPage from '../components/LandingPage'
import MessageForm from '../components/MessageForm'
import {io} from "socket.io-client"
import { BASE_URL } from '../services/baseUrl'

function Chat() {
  const socket = useRef()
  const navigate = useNavigate()
  const [contacts,setContacts] = useState([])
  const [currentUser,setCurrentUser] = useState(undefined)
  const [currentChat,setCurrentChat] = useState(undefined)
  const [isLoaded,setIsLoaded] = useState(false)
  

 

  const getCurrentUser = async ()=>{
    const data = await JSON.parse(localStorage.getItem("chat-app-user"))
    console.log(data.data);
    setCurrentUser(data.data)
    setIsLoaded(true)
    console.log(currentUser);
  }
  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login')
    }else{
      getCurrentUser()
      console.log("test:",currentUser);
    }
  },[])
  const currentUserImageApi = async()=>{
    if(currentUser){
      console.log(currentUser);
      console.log(currentUser.isProfilePicSet);
      if(currentUser.isProfilePicSet === true){
        const result = await axios.get(`${allUsersAPI}/${currentUser._id}`)
        console.log('Result:',result);
        setContacts(result.data)
        console.log(contacts);
        navigate('/chat')
      
      }else{
        navigate("/profilePic")
      }
    }
  
  }

  useEffect(()=>{
    if(currentUser){
      socket.current = io(BASE_URL)
      socket.current.emit("add-user",currentUser._id)
    }
  },[currentUser])
  useEffect(()=>{
   currentUserImageApi()
  },[currentUser])

  const handleChatChange = (chat)=>{
    setCurrentChat(chat)
  }

  return (
    <div className='mainContainer'>
      <div className="contact-Container">
             <Sidebar contacts={contacts} currentUser={currentUser} changeChat = {handleChatChange}/>
             {
             isLoaded && currentChat === undefined ?
             (<LandingPage currentUser={currentUser} />) :
             (<MessageForm  currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
             }
</div>
    </div>
  )
}

export default Chat