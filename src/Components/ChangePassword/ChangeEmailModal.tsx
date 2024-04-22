import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {changeEmailProfile, changeEmailVerifyOtp} from '../../Api/parlour'



interface ModalProps {
    setEmailModal: (value: boolean) => void;
    user:boolean
    emailProps:string
  }

const ChangeEmailModal = ({setEmailModal,user,emailProps}:ModalProps) => {

    const [email,setEmail] = useState(emailProps)
    const [otp,setOtp] = useState('')
    const [otpInput,setOtpInput] = useState(false)


    const handleEmailChange = async (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()

        try{
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            console.log('hi')
            toast.error("Enter valid email");
            return;
          }
          if (emailProps.toLowerCase() === email.toLowerCase()) {
            console.log('jj',emailProps.toLowerCase(),email.toLowerCase())
            toast.error("This is the current email");
            return;
          }
            if(!user){
                const res = await changeEmailProfile(email)
                if(!res.data.data){
                    // navigate('/parlour/ChangeEmailVerifyOtp')
                    setOtpInput(true)
                   }else{
                    toast.error("parlour already exist")
                   }
            }
        }catch(error){
            console.log(error)
        }
    }

    const verifyOtp = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        try{
        e.preventDefault()
          if(otp.trim().length!==4){
            toast.error('Enter valid otp')
          }
            const res = await changeEmailVerifyOtp(otp)
            console.log(res)
            if(res.data.data){
                setEmailModal(false)
                toast.success('Email changed successfully.')
            }
        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <div>
          <section className="absolute w-full top-0 ">
     <div className="container mx-auto px-4 h-full ">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4 pt-32">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white  border-0 ">
            <div className="rounded-t mb-0 px-6 py-6">

            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
            onClick={()=>setEmailModal(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>

              <div className="text-center mb-3">
                <h6 className="text-gray-600 text-sm font-bold">
                 Change Email
                </h6>
              </div>
              <div className="btn-wrapper text-center">

              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
             
              <form  >
              <div className="relative h-10 w-full min-w-[288px] mb-4">
                  <input
                    type="email"
                    disabled={otpInput}
                    id="form3"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="peer h-full w-full  border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  bg-white rounded  shadow focus:outline-none focus:shadow-outline "
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                </div>
                {otpInput &&
                    <div className="relative h-10 w-full min-w-[288px] mb-4">
                  <input
                    type="number"
                    id="form3"
                    value={otp}
                    name='otp'
                    onChange={(e)=>setOtp(e.target.value)}
                    className="peer h-full w-full  border border-white border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50  bg-white rounded shadow focus:outline-none focus:shadow-outline"
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Otp
                  </label>
                </div>}
               

                {!otpInput ? 
                <div className="text-center mt-6">
                  <button
                    className="bg-blue-800 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"

                    onClick={handleEmailChange}
                    style={{ transition: "all 0.15s ease 0s" }}
                  >
                  Change Email
                  </button>
                </div>
                :
                <div className="text-center mt-6">
                  <button
                    className="bg-blue-800 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"

                    onClick={verifyOtp}
                    style={{ transition: "all 0.15s ease 0s" }}
                  >
                  Verify Otp
                  </button>
                </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    </div>
  )
}

export default ChangeEmailModal