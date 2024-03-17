import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";
import { IoWalletSharp } from "react-icons/io5";


import {Link,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


const Sidebar = () =>{
    const [open,setOpen] = useState(true)

    const Menus = [
        { title: "Profile", src: <CgProfile/>,link:"/parlour/dashboard", gap: true },
        { title: "Bookings", src: <TbBrandBooking/>,link:"/parlour/dashboard", gap: true },
        { title: "wallet", src: <IoWalletSharp/>,link:"/parlour/dashboard", gap: true },
        
      ];
      const {userInfo} = useSelector((state:RootState)=>state.auth)
      const navigate = useNavigate()
      const dispatch = useDispatch()
      const handleLogout = async ()=>{
        try{
            const response = await userLogout()
            console.log(response)
            dispatch(logout())
            toast.success("Logged out succeesfully")
            navigate('/login')

        }catch(error){
            console.log(error)
        }
    }
    
    return (
        // <div className="flex">
          <div
            className={` ${
              open ? "w-72" : "w-20 "
            } bg-blue-900 h-screen p-5  pt-8 relative duration-300`}
          >
            <img
              className={`absolute cursor-pointer -right-5 top-9 w-10 bg-white border-purple-900
               border-2 rounded-full`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
              <img
                // src={logo}
                className={`cursor-pointer duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              />
              <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${
                  !open && "scale-0"
                }`}
              >
              ELYSIAN BOOK
              </h1>
            </div>
            <ul className="pt-6">
              {Menus.map((Menu, index) => (
                <Link to={Menu.link}>
                <li
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-base items-center gap-x-4  
                  ${Menu.gap ? "mt-5" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}
                >
                  <h1 className="text-2xl">{Menu.src}</h1>
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </li>
                </Link>
              ))}
    
    <li onClick={handleLogout}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-base items-center gap-x-4  
                  mt-5 `}
                >
                  <h1 className="text-2xl"><RiLogoutCircleLine/></h1>
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Logout
                  </span>
                </li>
            </ul>
          </div>
    
    
          
        // </div>
      );
}
export default Sidebar