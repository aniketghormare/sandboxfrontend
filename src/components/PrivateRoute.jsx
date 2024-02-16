import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

    let token=JSON.parse(localStorage.getItem("token"))
  return (
    <div>
      {
        token ? children : <Navigate to="/login"/>
      }
    </div>
  )
}

export default PrivateRoute
