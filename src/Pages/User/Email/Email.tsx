import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import { ForgotPassword, verifyOtpForgotPassword } from '../../../Api/user'
import Api from '../../../Services/axios'
import { vendorForgotPassword, vendorverifyOtpForgotPassword } from '../../../Api/parlour'

interface forgotPasswordInterface{
  user:boolean
}

const Email = ({user}:forgotPasswordInterface) => {
    const [email,setEmail] = useState('')
    const [otp,setOtp] = useState('')
    const [showOtpInput,setShowOtpInput] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e:any) => {
      
      e.preventDefault();
	  
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {

          toast.error("Enter valid email");
          return;
        } 


        if(user){
          const res = await ForgotPassword(email)
        console.log(res);
        if(res.data.data){          
          setShowOtpInput(true)
        }else if(!res.data.status){
          toast.error("invalid email")
        }
        }else{
          const res = await vendorForgotPassword(email)
          console.log(res)
          if(res.data.data){
            setShowOtpInput(true)
          }else {
            toast.error("invalid email")
          }
        }
        
        
      } catch (error) {
        console.log(error);
      }
    };

    const verifyOtp = async(e:any)=>{
        e.preventDefault();
        try {
            console.log('hey');
            
            if(user){
              const res = await verifyOtpForgotPassword(otp)
            console.log(res)
            if(!res.data){
                toast.error("Invalid otp")
            }else{
                navigate('/changePassword')
            }

            }else{
                const res = await vendorverifyOtpForgotPassword(otp)
                console.log(res);
                if(res.data){
                  navigate('/parlour/changePassword')
                }else{
                  toast.error("invalid otp")
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

  return (
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
        <div className="w-full lg:w-4/12 px-4 pt-32">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white bg-opacity-60 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-gray-600 text-sm font-bold">
                 Forgot Password
                </h6>
              </div>
              <div className="btn-wrapper text-center">

              </div>
              <hr className="mt-6 border-b-1 border-gray-400" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
             
              <form >
                <div className="relative h-10 w-full min-w-[288px] mb-4">
                  <input
                    type="email"
                    id="form1"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                    placeholder=" "
                    disabled = {showOtpInput}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                </div>
                {
                    showOtpInput && 
                    <div className="relative h-10 w-full min-w-[288px] mb-4">
                <input
                    type="number"
                    id="form2"
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    OTP
                  </label>
                </div>}

             

               
             {!showOtpInput ?
                <div className="text-center mt-6">
                  <button
                    className="bg-purple-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"

                    onClick={handleSubmit}
                    style={{ transition: "all 0.15s ease 0s" }}
                  >
                    Send Otp
                  </button>
                </div>

                    :
                <div className="text-center mt-6">
                  <button
                    className="bg-purple-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"

                    onClick={verifyOtp}
                    style={{ transition: "all 0.15s ease 0s" }}
                  >
                    Verify Otp
                  </button>
                </div>}
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Email