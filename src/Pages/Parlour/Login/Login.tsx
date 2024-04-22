import  { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  parlourLogin } from '../../../Api/parlour';
import GoogleAuthSignUp from '../../../Components/User/GoogleAuthSignUp';
import logo from "../../../assets/logo.png"
import { useDispatch } from 'react-redux';
import { setParlourCredentials ,setParlourId} from '../../../Store/slice/authSlice';

const Login = () => {
    
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const handleSubmit = async (e:any) => {
      
      e.preventDefault(); // Add this line to prevent default form submission
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {

          toast.error("Enter valid email");
          return;
        } else if (password.trim().length < 4) {

          toast.error("Enter password with minimum 6 characters");
          return;
        }


        const res = await parlourLogin(email,password)
        console.log(res);
        if (res.data.success) {
          dispatch(setParlourCredentials(res.data.token))
          dispatch(setParlourId(res.data.vendorId))
          toast.success("Signed in...");
          console.log("Navigating to '/'...");
          navigate('/parlour/dashboard')
        }else if(!res.data.status){
          toast.error(res.data.message)
        }
        
        
      } catch (error) {
        console.log(error);
      }
    };


  return (

    
        <section className="">
          <div className="container h-full px-6 py-24 bg-grey">
            <div className="g-6 flex h-full flex-wrap items-center justify-center">
              {/* <!-- Left column container with background--> */}
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-96">
                <div>
                <img
                  src={logo}
                  className="w-full"
                  alt="Phone image"
                />
              
                </div>
                <div>
                <h1>Welcome Vendor</h1>
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
                    className="peer h-full w-full rounded-[7px] border border-grey border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2" 
                    placeholder=" Email"
                  />
    
                  {/* <!--Password input--> */}
                  <input
                    type="password"
                    id='form2'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="peer h-full  rounded-[7px] border border-grey border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 my-3 w-full"
                    placeholder="Password"
                  />
    
    
                  <button
                    className="bg-purple-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="submit"
                    style={{ transition: "all 0.15s ease 0s" }}
                  >
                    <h1>LOGIN</h1>
                  </button> 
    
                  {/* <!-- Divider --> */}
                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-900">
                      OR
                    </p>
                  </div>
    
                  {/* <!-- Social login buttons --> */}
                  <GoogleAuthSignUp user={false} login={true}/>
                  <div className="flex flex-wrap mt-6">
                    <div className="w-1/2">
                      <Link to ={"/parlour/forgotpassword"}className="text-gray-900">
                        <small>Forgot password?</small>
                      </Link>
                    </div>
                    <div className="w-1/  2 text-right">
                        <Link to={"/parlour/signup"}><small>Create new account</small></Link>
                    </div>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </section>
    
  );
};

export default Login
