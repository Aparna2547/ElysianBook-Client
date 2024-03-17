import React from 'react'
import logo from "../../../assets/logo.png"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../../Api/user'
import { logout } from '../../../Store/slice/authSlice'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'


interface RootState{
    auth:{
        userInfo:string
    }
}
const Navbar = () => {
    const {userInfo} = useSelector((state:RootState)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const logoutHandle = async ()=>{
    //     try{
    //         const response = await userLogout()
    //         console.log(response)
    //         dispatch(logout())
    //         toast.success("Logged out succeesfully")
    //         navigate('/login')

    //     }catch(error){
    //         console.log(error)
    //     }
    // }
    return (
        <>
            {/* component */}
            <nav className="bg-pink-100 shadow shadow-gray-300 w-100 px-8 md:px-auto fixed left-0 right-0 top-0 z-50">
                <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                    {/* Logo */}
                    <div className="text-indigo-500 md:order-1">
                        {/* Heroicon - Chip Outline */}
                        <img
                            src = {logo}
                            className="h-20 w-20"
                        >

                        </img>
                    </div>
                    <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                        <ul className="flex font-semibold justify-between">
                            {/* Active Link = text-indigo-500
          Inactive Link = hover:text-indigo-500 */}
                            {/* <li className="md:px-4 md:py-2 text-indigo-500">
                                <a href="#">Dashboard</a>
                            </li> */}
                            <li className="md:px-4 md:py-2 hover:text-indigo-400">
                                <a href="/">Home</a>
                            </li>
                            <li className="md:px-4 md:py-2 hover:text-indigo-400">
                                <a href="/parlourlist">Parlours</a>
                            </li>
                            <li className="md:px-4 md:py-2 hover:text-indigo-400">
                                <a href="#">About</a>
                            </li>
                            {/* <li className="md:px-4 md:py-2 hover:text-indigo-400">
                                <a href="#">Contact</a>
                            </li> */}
                        </ul>
                    </div>
                    {userInfo ? 
                        
                        <div className="order-2 md:order-3">
                        <Link to={'/profilePage'}>
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-50 rounded-xl flex items-center gap-2" 
                        // onClick={logoutHandle}
                        >
                            {/* Heroicons - Login Solid */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Profile</span>
                        </button>
                        </Link>
                    </div>
                        :
                    <div className="order-2 md:order-3">
                      <Link to={"/login"}>
                        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                            {/* Heroicons - Login Solid */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Login</span>
                        </button>
                        </Link>
                    </div>}
                </div>
            </nav>
        </>

    )
}

export default Navbar
