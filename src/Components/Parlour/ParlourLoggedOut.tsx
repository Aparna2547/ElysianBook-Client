// import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet,Navigate} from "react-router-dom"

interface RootState{
    auth:{
        parlourInfo:string
    }
}
const ParlourLoggedOut = () => {
    const {parlourInfo} = useSelector((state:RootState)=>state.auth)
  return (
  parlourInfo? <Navigate to="/parlour/dashboard"/> : <Outlet/>
  )
}

export default ParlourLoggedOut