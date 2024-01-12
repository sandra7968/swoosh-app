import React from 'react'

function LandingPage({ currentUser }) {
  console.log(currentUser);
  return (
   <>
      <div style={{background:'white',backgroundImage:'url(https://i.pinimg.com/originals/7d/9b/1d/7d9b1d662b28cd365b33a01a3d0288e1.gif)',backgroundPositionX:'-60%',backgroundRepeat:'no-repeat',display:'flex', justifyContent:'right',alignItems:'center'}}>
          <h1 style={{marginRight:'100px'}}>Welcome, <span style={{color:'gray'}}>{currentUser?.username}!</span> </h1>
      </div>
   </>
  )
}

export default LandingPage