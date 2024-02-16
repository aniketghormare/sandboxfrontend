import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Sandbox from '../pages/Sandbox'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import PrivateRoute from './PrivateRoute'


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path='/sandbox' element={<PrivateRoute><Sandbox/></PrivateRoute>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
