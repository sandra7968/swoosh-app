import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {Buffer} from 'buffer'
import './ProfilePic.css'
import {Button} from 'react-bootstrap'
import { profilePicAPI } from '../services/allAPI';
function ProfilePic() {
const imageApi = "https://api.multiavatar.com/4645646"
const navigate = useNavigate()
const [profile,setProfile] = useState([])
const [isLoading,setIsLoading] = useState(true)
const [selectedProfile,setSelectedProfile] = useState(undefined)


const setProfilePicture = async ()=>{
    if(selectedProfile === ""){
        toast.error("Please choose an image!")
    }else{
        const user = await JSON.parse(localStorage.getItem("chat-app-user"))
        console.log(user._id);
        
        const { data } = await axios.post(`${profilePicAPI}/${user._id}`,{
            image: profile[selectedProfile]
        })
        const updatedUserData = {
            ...user.data,
            isProfilePicSet: true,
            profilePic: data.image,
          };
    
          localStorage.setItem("chat-app-user", JSON.stringify(updatedUserData));
          console.log(updatedUserData);
          console.log(data);
          localStorage.clear()
      navigate('/login')

        if(data.isSet){
           
        }else{
            toast.error("Error setting up avatar!")
        }
        
    }
}


const getImageApi = async ()=>{
    const data = []
    while (data.length < 4) {
        const image = await axios.get(`${imageApi}/${Math.round(Math.random()*1000)}`)
        const buffer = Buffer.from(image.data, 'binary');
        data.push(buffer.toString("base64"))
    }
    setProfile(data)
    setIsLoading(false)
}


useEffect(()=>{
    getImageApi()
},[])

useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login')
    }
  },[])
  return (
    <>
    {
        isLoading ? (
        <div className=''>
            <img src="https://cdn.dribbble.com/users/1018933/screenshots/2801646/dribbble_preview.gif" alt="loader" className='loader' />
        </div>
        ) :(
             <div className='profileContainer'>
             <div className='title-container'>
                 <h1>Pick an image as your profile picture</h1>
             </div>
             <div className="profileImage">
                 {profile.map((avatar,index)=>{
                     return(
                         <div key={index} className={`avatar ${selectedProfile === index? "selected" :""}`}>
                             <img src={`data:image/svg+xml;base64,${avatar}`} onClick={()=>setSelectedProfile(index)}alt="avatar" />
                         </div>
                     )
                 })}
             </div>
             
             <Button className='btn btn-dark' onClick={setProfilePicture}>Set as Profile Picture</Button>
             <ToastContainer position='top-center' autoClose={2000} theme='colored' />
         </div>
        )
    }
       </>
  )
}

export default ProfilePic