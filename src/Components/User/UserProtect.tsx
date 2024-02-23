import React from 'react'
import {Outlet, Navigate} from "react-router-dom"
import { useSelector } from 'react-redux'


interface RootState{
auth:{
    userInfo: string
}
}
const UserProtect = () => {
    const {userInfo} = useSelector((state:RootState)=>state.auth)
    
  return (
    userInfo ? <Outlet/> : <Navigate to='/login' />
  )
}

export default UserProtect