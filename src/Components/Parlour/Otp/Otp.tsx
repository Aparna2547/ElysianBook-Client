import  { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import { verifyOtp } from '../../../Api/parlour';
import Api from '../../../Services/axios';
import logo from "../../../assets/logo.png"



const Otp = () => {
    const [ otp,setOtp] = useState('')
    const navigate = useNavigate()
    
    const [seconds,setSeconds] = useState(59);
    const [resendOtp,setResendOtp] = useState(false)

    useEffect(()=>{
      const intervalId = setInterval(()=>{
        setSeconds((prevSeconds) =>{
          if(prevSeconds === 0){
            clearInterval(intervalId);
            setResendOtp(true);
            return 0;
          }
          return prevSeconds -1
        })
      },1000)

      return () => clearInterval(intervalId)
    },[])
  
    const handleResendOtp = async (e:any) =>{
      e.preventDefault();
      setResendOtp(false)
      setSeconds(59)
      const res = await Api.post("/parlour/signup",{otp})
      console.log(res)
      if(res.data.status){
        toast.success("registrtion successfull.please login")
        navigate('/parlour/login')
      }else if(!res.data.status){
        toast.error(res.data.message)
      }
    }

    const handleSubmit = async (e:any) => {
     e.preventDefault();
        console.log('ihhh')
        try {
         if (otp.trim().length !== 4) {
  
            toast.error("Enter password with minimum 6 characters");
            return;
          }
  
  
          const res = await verifyOtp(otp)
          console.log(res);
          if(res.data.status){
            toast.success("signed up successfully..Please Login")
            navigate('/parlour')
          }else if(!res.data.status){
            toast.error(res.data.message)
          }
          
          
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <section className="absolute w-full top-0">
    <div
      className="absolute top-0 w-full h-full"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2654.jpg")',
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    />
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4 pt-32">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white bg-opacity-60 border-0">
            <div className="rounded-t mb-0 px-6 py-0">
              <div className="flex justify-center items-center h-20 w-20">
                      <img
                        className=" w-full"
                        background-position="cover"
                        src={logo}
                        alt="logo"
                      />
                      <h3 className='ps-2'>Elysian Book</h3>
                    </div>
               
              <div className="btn-wrapper text-center">
               
              
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-gray-500 text-center mb-3 font-bold">
              </div>
              <form onSubmit={handleSubmit}>
                <div className="relative h-10 w-full min-w-[288px] mb-4">
                  <input
                    type="text"
                    id="form1"
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    className="peer h-full w-75 rounded"
                    placeholder="Enter OTP"
                  />
                  {/* <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    OTP
                  </label> */}
                </div>

             

               
                <div className="text-center mt-6">
                 {!resendOtp ?
                  <button
                    className="bg-purple-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="submit"
                    style={{ transition: "all 0.15s ease 0s" }}
                  >
                    Sign In
                  </button>
                  :
                  <button
                    className="bg-purple-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="submit"
                    onClick={handleResendOtp}
                    style={{ transition: "all 0.15s ease 0s" }}
                  >
                  Resend OTP
                  </button>
                  }
                   {!resendOtp &&
                      <div className="countdown-text">
                        <p>Time Remaining: 00:{seconds<10 ? `0${seconds}` :seconds}</p>
                      </div>
                    }
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default Otp