import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'
function Home() {
  return (
    <Row>
      <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
        <div>
          <h1 className='ms-5'>Discover the joy of meaningful conversations.</h1>
          <p className='ms-5'>Swoosh! lets you connect with the world</p>
          <Link to='/chat'>
            <Button className='ms-5'variant="success">Get Started  <i className="fas fa-comments home-message-icon"></i></Button>
          </Link>
        </div>
      </Col>
      <Col md={6} className='home_bg'></Col>
    </Row>
  )
}

export default Home