import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Button, Col, Container, Form, Row} from 'react-bootstrap'
import './Register.css'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from '../services/allAPI'

function Register() {
  const [userData,setUserData] = useState({
    username:"",email:"",password:"",confirmPassword:""
})
const navigate = useNavigate()
 const handleRegister = async (e)=>{
  e.preventDefault()
  const {username,email,password,confirmPassword} = userData
  if(!username || !email || !password || !confirmPassword){
    toast.error("Please fill the form completely!" )
  }else{
    if(password !== confirmPassword){
      toast.error('Passwords do not match!')
    }else if(username.length<=3){
      toast.error('Username should contain minimum 4 characters!')
    }else if(password.length<=3){
      toast.error('Password should contain minimum 6 characters!')
    }else{
      toast.success(`${username} has been registered successfully!`)
    }
    const result = await registerAPI({username,email,password})
    if(result.status === 200){
      console.log(result.data);
      localStorage.setItem('chat-app-user',JSON.stringify(result.data))
      navigate('/profilePic')
    }else{
      console.log(result);
      toast.warning(result.response.data);
    }
  }
 }
 useEffect(()=>{
  if(localStorage.getItem('chat-app-user')){
    navigate('/profilePic')
  }
},[])

  return (
    <>
   <Container>
      <Row>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
           <div className='register w-75'>
             
              <Form onSubmit={handleRegister} className=' p-4'>
              <div className='d-flex justify-content-center align-items-center'>
             <i className="fa-solid fa-feather fa-2x me-2"></i>
             <h1>Swoosh!</h1>
             </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Username" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Email ID" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} />
              </Form.Group>
        
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}  />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Confirm Password" value={userData.confirmPassword} onChange={(e)=>setUserData({...userData,confirmPassword:e.target.value})} />
              </Form.Group>
              <Button className='btn btn-success ' variant="primary" type="submit">
                Create Account
              </Button>
              <span> Already an User? <Link to={'/login'}>Login</Link></span>
            </Form>
           </div>
        </Col>
        <Col md={5} className="register_bg"></Col>
      </Row>
      <ToastContainer position='top-center' autoClose={2000} theme='colored' />
   </Container>
    </>
  )
}

export default Register