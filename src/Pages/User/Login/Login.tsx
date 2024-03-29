import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../../Services/axios";
import GoogleAuthSignUp from "../../../Components/User/GoogleAuthSignUp";
import Navbar from "../../../Components/User/NavBar/Navbar";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../Store/slice/authSlice";

// import '/Login.cs'

const Login: React.FC = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const handleSubmit = async (e:any) => {
      
      e.preventDefault();
	  // console.log('dfjdioj');
	  
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {

          toast.error("Enter valid email");
          return;
        } else if (password.trim().length < 4) {

          toast.error("Enter password with minimum 6 characters");
          return;
        }


        const res = await Api.post("/user/login",{email,password})
        console.log(res);
        if(res.data.success){
          console.log(res.data)
          dispatch(setCredentials(res.data.token))
          toast.success("signed in...")
          navigate('/')
        }else if(!res.data.status){
          toast.error(res.data.message)
        }
        
        
      } catch (error) {
        console.log(error);
      }
    };


  return (
<>
    <Navbar/>
    <section className="absolute w-full top-0">
      <div
        className="absolute top-0 w-full h-full"
        style={{
          backgroundImage: 'url("https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2654.jpg")',
        backgroundSize: "cover",
        height: '100vh',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        }}
      />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-5/12 px-4 pt-32">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white bg-opacity-60 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">

                  <GoogleAuthSignUp  login={true} user={true}/>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative h-10 w-full min-w-[288px] mb-4">
                    <input
                      type="email"
                      id="form1"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder=" "
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Email
                    </label>
                  </div>

                  <div className="relative h-10 w-full min-w-[288px]">
                    <input
                      type="password"
                      className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder=" "
                      id="form2"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Password
                    </label>
                  </div>

                 
                  <div className="text-center mt-6">
                    <button
                      className="bg-purple-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: "all 0.15s ease 0s" }}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="flex flex-wrap mt-6">
                    <div className="w-1/2">
                      <Link to ={"/forgotpassword"}className="text-gray-900">
                        <small>Forgot password?</small>
                      </Link>
                    </div>
                    <div className="w-1/2 text-right">
                      <a href="#pablo" className="text-gray-900">
                        <Link to={"/signup"}><small>Create new account</small></Link>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Login;
