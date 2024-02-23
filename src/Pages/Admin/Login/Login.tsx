import React, { useState } from 'react'
import { TERipple } from "tw-elements-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from '../../../Api/admin';
import logo from "../../../assets/logo.png"
import { setAdminCredentials, setCredentials } from '../../../Store/slice/authSlice';
import { useDispatch } from 'react-redux';


const Login = () => {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
      const handleSubmit = async (e:any) => {
        
        e.preventDefault(); 
        try {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
  
            toast.error("Enter valid email");
            return;
          } else if (password.trim().length < 4) {
  
            toast.error("Enter password with minimum 4characters");
            return;
          }
  
  
          const res = await login(email,password)
          console.log(res);
          if (res.data.success) {
            dispatch(setAdminCredentials(res.data.token))
            toast.success("Signed in...");
            navigate('/admin/dashboard')
          }else if(!res.data.status){
            toast.error(res.data.message)
          }
          
          
        } catch (error) {
          console.log(error);
        }
      };
  
  
    return (
  

      <>
 <section >
  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border border-black">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src={logo}
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            {/* <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div> */}
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
     
    </div>
  </div>
  </section>
</>

      
          // <section className="bg-grey">
          //   <div className="container h-full px-6 py-24 ">
          //     <div className="g-6 flex h-full flex-wrap items-center justify-center border border-grey bg-white shadow-lg ">
          //       {/* <!-- Left column container with background--> */}
          //       <div className="mb-12 md:mb-0 md:w-8/12 lg:w-80  ">
          //         <div>
          //         <img
          //           src="src/assets/logo.png"
          //           className="w-full"
          //           alt="Phone image"
          //         />
                
          //         </div>
          //         <div>
          //         </div>
          //       </div>
      
          //       {/* <!-- Right column container with form --> */}
          //       <div className="md:w-8/12 lg:ml-6 lg:w-5/12 border border-grey  p-5">
          //         <form onSubmit={handleSubmit}>
          //           {/* <!-- Email input --> */}
          //           <input
          //             type="email"
          //             id='form1'
          //             value={email}
          //             onChange={(e)=>setEmail(e.target.value)}
          //             className="peer h-full w-full rounded-[7px] border border-grey border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 w-full" 
          //             placeholder=" Email"
          //           />
      
          //           {/* <!--Password input--> */}
          //           <input
          //             type="password"
          //             id='form2'
          //             value={password}
          //             onChange={(e)=>setPassword(e.target.value)}
          //             className="peer h-full w-full rounded-[7px] border border-grey border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 my-3 w-full"
          //             placeholder="Password"
          //           />
      
      
          //           <button
          //             className="bg-purple-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
          //             type="submit"
          //             style={{ transition: "all 0.15s ease 0s" }}
          //           >
          //             LOGIN
          //           </button> 
      
          //           {/* <!-- Divider --> */}
                  
                    
          //         </form>
          //       </div>
          //     </div>
          //   </div>
          // </section>
      
  )
}

export default Login