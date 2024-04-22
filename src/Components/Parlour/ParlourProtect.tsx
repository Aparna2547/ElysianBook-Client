// import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet, Navigate} from "react-router-dom"

interface RootState{
    auth:{
        parlourInfo:string
    }
}
const ParlourProtect = () => {
    const {parlourInfo} = useSelector((state:RootState)=>state.auth)

  return (
  parlourInfo? <Outlet/> : <Navigate to="/parlour"/>
  )
}

export default ParlourProtect