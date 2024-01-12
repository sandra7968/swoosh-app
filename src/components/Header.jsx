import React from 'react'
import  {Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary fs-5">
      <Container>
        <Navbar.Brand ><Link className='fs-3' style={{textDecoration:'none', color:'black' }} to={'/'}><i className="fa-solid fa-feather  me-2"></i>Swoosh!</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
               <Nav.Link ><Link style={{textDecoration:'none', color:'black'}} to={'/login'}>Login</Link></Nav.Link>

            <Nav.Link ><Link style={{textDecoration:'none', color:'black'}} to={'/chat'}>Chat</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header