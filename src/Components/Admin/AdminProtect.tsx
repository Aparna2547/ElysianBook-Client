import { useSelector } from 'react-redux'
import {Outlet,Navigate} from "react-router-dom"

interface RootState{
    auth:{
        adminInfo:string
    }
}
const AdminProtect = () => {
    const {adminInfo} = useSelector((state:RootState)=>state.auth)
  return (
    adminInfo ? <Outlet/> : <Navigate to='/admin'/>
  )
}

export default AdminProtect