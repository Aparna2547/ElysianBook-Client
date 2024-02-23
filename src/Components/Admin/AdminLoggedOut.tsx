import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet,Navigate} from "react-router-dom"


interface RootState{
    auth:{
        adminInfo:string
    }
}
const AdminLoggedOut = () => {
    const {adminInfo} = useSelector((state:RootState)=>state.auth)
    return (
      adminInfo ? <Navigate to='/admin/dashboard'/> :<Outlet/>
    )
}

export default AdminLoggedOut