import React, { useState } from 'react'
import { TERipple } from "tw-elements-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from '../../../Api/admin';


const Login = () => {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
  
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
            toast.success("Signed in...");
            console.log("Navigating to '/'...");
            navigate('/admin/dashboard')
          }else if(!res.data.status){
            toast.error(res.data.message)
          }
          
          
        } catch (error) {
          console.log(error);
        }
      };
  
  
    return (
  
      
          <section className="bg-grey">
            <div className="container h-full px-6 py-24 ">
              <div className="g-6 flex h-full flex-wrap items-center justify-center border border-grey bg-white shadow-lg ">
                {/* <!-- Left column container with background--> */}
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-80  ">
                  <div>
                  <img
                    src="src/assets/logo.png"
                    className="w-full"
                    alt="Phone image"
                  />
                
                  </div>
                  <div>
                  <h1>Welcome Admin</h1>
                  </div>
                </div>
      
                {/* <!-- Right column container with form --> */}
                <div className="md:w-8/12 lg:ml-6 lg:w-5/12 border border-grey  p-5">
                  <form onSubmit={handleSubmit}>
                    {/* <!-- Email input --> */}
                    <input
                      type="email"
                      id='form1'
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      className="peer h-full w-full rounded-[7px] border border-grey border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 w-full" 
                      placeholder=" Email"
                    />
      
                    {/* <!--Password input--> */}
                    <input
                      type="password"
                      id='form2'
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      className="peer h-full w-full rounded-[7px] border border-grey border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 my-3 w-full"
                      placeholder="Password"
                    />
      
      
                    <button
                      className="bg-purple-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: "all 0.15s ease 0s" }}
                    >
                      Sign Up
                    </button> 
      
                    {/* <!-- Divider --> */}
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                      <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-900">
                        OR
                      </p>
                    </div>
      
                    {/* <!-- Social login buttons --> */}
                    <TERipple rippleColor="light" className="w-full">
                      <a
                        className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        style={{ backgroundColor: "#3b5998" }}
                        href="#!"
                        role="button"
                      >
                        {/* <!-- Facebook --> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-3.5 w-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                        Continue with Google
                      </a>
                    </TERipple>
                    <div className="w-2/2 text-right">
                     <Link to={'/parlour/signup'}>
                        <small>New User</small></Link>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
          </section>
      
  )
}

export default Login