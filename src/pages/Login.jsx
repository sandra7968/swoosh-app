import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { loginAPI } from '../services/allAPI'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
 
 function Login() {
  const [userData,setUserData] = useState({
    username:"",password:""
})
const navigate = useNavigate()
 const handleLogin = async (e)=>{
  e.preventDefault()
  const {username,password} = userData
  if(!username || !password ){
    toast.error("Please enter your username and password!" )
  }else{
    const result = await loginAPI({username,password})
    if(result.status === 200){
      console.log(result.data);
      localStorage.setItem('chat-app-user',JSON.stringify(result))
      navigate('/chat')
    }else{
      console.log(result);
      toast.warning(result.response.data);
    }
  }
 }
useEffect(()=>{
  if(localStorage.getItem('chat-app-user')){
    navigate('/chat')
  }
},[])
   return (
     <>
     <Container>
        <Row>
           <Col md={5} className="login_bg"></Col>
           <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
             <div className='login w-75 '>
             
             <Form className=' p-4 ' onSubmit={handleLogin} >
             <div className='d-flex justify-content-center align-items-center'>
            <i className="fa-solid fa-feather fa-2x me-2"></i>
            <h1>Swoosh!</h1>
            </div>
      
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Username" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />
              </Form.Group>
       
             <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Control type="password" placeholder="Password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}  />
             </Form.Group>
      
             <Button className='btn btn-success w-25 text-center' variant="primary" type="submit" >
               Login
             </Button>
             <span> Don't have an account? <Link to={'/register'}>Register</Link></span>
           </Form>
          </div>
           </Col>
        </Row>
     </Container>
     <ToastContainer position='top-center' autoClose={2000} theme='colored' />

     </>
   )
 }
 
 export default Login