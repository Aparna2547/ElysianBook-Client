import  { useState } from 'react'
import { toast } from 'sonner'

import {Link} from "react-router-dom"
import Image from "../../../assets/logo.png"
import {useNavigate} from "react-router-dom"
import { signup } from '../../../Api/parlour';
import GoogleAuthSignUp from '../../../Components/User/GoogleAuthSignUp';


const SignUp = () => {

    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigate = useNavigate()





  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log('hii');
    

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name.trim().length < 1) {
       toast.error("Enter a valid username");
        return;
      } else if (!emailRegex.test(email)) {
        toast.error("Enter valid email");
        return;
      } else if (password.trim().length < 4) {
        toast.error("Enter password with minimum 6 characters");
        return;
      } else if (password !== cpassword) {
        toast.error("Passwords don't match");
        return;
      }

     const res = await signup(name,email,password)
     console.log(res);
     if(!res.data.data){
      navigate('/parlour/verifyOtp')
     }else{
      toast.error("parlour already exist")
     }
     

    } catch (error) {
      console.error(error);
    //   setError("An error occurred during registration");
    } 
  };
  return (
   
    
    <section className="">
    <div className="container h-full px-6 py-24 bg-grey">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        {/* <!-- Left column container with background--> */}
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">

          <div className='w-25 h-25 mt-0'>
          <img
            src={Image}
            className="mt-0"
            alt="Phone image"
            style={{backgroundPosition:'cover'}}
          />
          </div>
        </div>

        {/* <!-- Right column container with form --> */}
        <div className="md:w-8/12 lg:ml-6 lg:w-5/12 border border-grey  p-10">
          <form onSubmit={handleSubmit}>
          <input
              type="text"
              id='form1'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="peer h-full  rounded-[7px] border border-grey border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 w-full" 
              placeholder=" Name"
            />
            {/* <!-- Email input --> */}
            <input
              type="email"
              id='form2'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="peer h-full  rounded-[7px] border border-grey border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 mt-3 focus:border-2 w-full" 
              placeholder=" Email"
            />

            {/* <!--Password input--> */}
            <input
              type="password"
              id='form3'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="peer h-full rounded-[7px] border border-grey border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 mt-3 w-full"
              placeholder="Password"
            />
             <input
              type="password"
              id='form4'
              value={cpassword}
              onChange={(e)=>setCPassword(e.target.value)}
              className="peer h-full  rounded-[7px] border border-grey border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 mt-3 w-full"
              placeholder="Confirm Password"
            />


            <button
              className="bg-purple-900 mt-5 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
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
            <GoogleAuthSignUp login={false} user={false}/>
            <div className="w-2/2 text-right">
             <Link to={'/parlour/'}>
                <small>
                Already have an account</small></Link>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </section>

  )
}

export default SignUp