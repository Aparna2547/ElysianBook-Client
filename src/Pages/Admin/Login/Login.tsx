import { useState } from 'react'
import {  useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { login } from '../../../Api/admin';
import logo from "../../../assets/logo.png"
import { setAdminCredentials } from '../../../Store/slice/authSlice';
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

      
  )
}

export default Login