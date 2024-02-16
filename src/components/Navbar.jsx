import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{height:"60px",width:"100vw",border:"1px solid teal",display:"flex",justifyContent:"space-evenly",alignItems:"center",backgroundColor:"teal"}}>
      <Link style={{color:"white",textDecoration:"none"}} to="/">Home</Link>
      <Link style={{color:"white",textDecoration:"none"}} to="/signup">Signup</Link>
      <Link style={{color:"white",textDecoration:"none"}} to="/login">Login</Link>
      <Link style={{color:"white",textDecoration:"none"}} to="/sandbox">Sandbox</Link>
    </div>
  )
}

export default Navbar
