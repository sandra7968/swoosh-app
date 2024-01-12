import React, { useEffect, useState } from 'react'
import { Button, Navbar } from 'react-bootstrap'
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
function Sidebar({contacts,currentUser, changeChat}) {
    const [currentUserName,setCurrentUserName] = useState(undefined)
    const [currentUserImage,setCurrentUserImage] = useState(undefined)
    const [currentSelected,setCurrentSelected] = useState(undefined)
    const navigate = useNavigate()
    useEffect(()=>{
      if(currentUser){
        setCurrentUserImage(currentUser.profilePic)
        setCurrentUserName(currentUser.username)
      }
    },[currentUser])
    const changeCurrentChat = (index,contact)=>{
      setCurrentSelected(index)
      changeChat(contact)
    }
    const handleLogout = async ()=>{
      localStorage.clear()
      navigate('/login')
    }
  return (
    <>
       {currentUserImage && currentUserName && (
        <div className='contactContainer'>
                  <Navbar.Brand ><Link className='text-white d-flex align-items-center justify-content-center mt-3 fs-2' style={{textDecoration:'none' }} to={'/'}><i className="fa-solid fa-feather  me-2"></i>Swoosh!</Link></Navbar.Brand>
            <div className='contacts'>
              {contacts.map((contact,index)=>{
                return (
                  <div key={contact._id} className={`contact ${index === currentSelected?"selected":""}`} onClick={()=>changeCurrentChat(index,contact)}>
                    <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${contact.profilePic}`} alt="" />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="current-user">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
              </div>
              <div className="username">
                      <h2>{currentUserName}</h2>
                    </div>
                    <div><Button className='me-2' variant='danger' onClick={handleLogout}>Logout</Button></div>
            </div>
        </div>
       )}
    </>
  )
}

export default Sidebar