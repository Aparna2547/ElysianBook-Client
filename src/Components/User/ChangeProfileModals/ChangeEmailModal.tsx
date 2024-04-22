import {useState} from 'react'
import {toast} from "react-toastify"
import { changeUserEmail,changeUserEmailSave } from '../../../Api/user'
import { useDispatch } from 'react-redux';
import { logout } from '../../../Store/slice/authSlice';


interface ModalProps {
  setEmailModal :(value:boolean) =>void 
  emailProps:string
}

const ChangeEmailModal = ({setEmailModal,emailProps}:ModalProps) => {
  const [email,setEmail] = useState(emailProps)
  const [otp,setOtp] = useState('')
  const [otpInput,setOtpInput] = useState(false)
  const dispatch = useDispatch()

  const handleEmailChange = async (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault()

    try {
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

      const res = await changeUserEmail(email)
      if(!res.data.data){
        setOtpInput(true)
      }else{
        toast.error('email already exist')
      }
      console.log(email)

    } catch (error) {
      console.log(error)
    }
  }

  const verifyOtp = async(e:  React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    try{
      if(otp.trim().length!==4){
        toast.error("enter otp")
      }
      const res = await changeUserEmailSave(Number(otp))
      if(res.data.data){
        setEmailModal(false)
        toast.success("email changed successfully")
        dispatch(logout())
      }else{
        toast.error('wrong otp')
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
   
    <div>
      <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
  <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
   <button onClick={()=>setEmailModal(false)}>
   <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 cursor-pointer shrink-0 fill-[#333] hover:fill-red-500 float-right"
      viewBox="0 0 320.591 320.591"
    >
      <path
        d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
        data-original="#000000"
      />
      <path
        d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
        data-original="#000000"
      />
    </svg>
   </button>
    <div className="my-6 text-center">
      <h4 className="text-3xl text-[#333] font-extrabold">Change email</h4>
     
    </div>
    <form className="space-y-4">
      <div className="relative flex items-center">
        <input
          type="email"
          placeholder="Enter Email"
          disabled={otpInput}
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="px-4 py-3 bg-white text-[#333] w-full text-sm border-2 outline-[#007bff] rounded-lg"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#bbb"
          stroke="#bbb"
          className="w-[18px] h-[18px] absolute right-4"
          viewBox="0 0 682.667 682.667"
        >
          <defs>
            <clipPath id="a" clipPathUnits="userSpaceOnUse">
              <path d="M0 512h512V0H0Z" data-original="#000000" />
            </clipPath>
          </defs>
          <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
            <path
              fill="none"
              strokeMiterlimit={10}
              strokeWidth={40}
              d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
              data-original="#000000"
            />
            <path
              d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
              data-original="#000000"
            />
          </g>
        </svg>
      </div>

{otpInput &&
      <div className="relative flex items-center">
        <input
          type="number"
          placeholder="Enter otp"
          value={otp}
          name='otp'
          onChange={(e)=>setOtp(e.target.value)}
          className="px-4 py-3 bg-white text-[#333] w-full text-sm border-2 outline-[#007bff] rounded-lg"
        />
      </div>
    }  

    {!otpInput  ?  
      <button
        type="submit"
        onClick={handleEmailChange}
        className="px-6 py-2.5 !mt-8 w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full"
      >
        CHANGE EMAIL
      </button>
      :
      <button
      type="submit"
      onClick={verifyOtp}
      className="px-6 py-2.5 !mt-8 w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full"
    >
     VERIFY OTP
    </button>
}
    </form>
    
  </div>
</div>

    </div>
  )
}

export default ChangeEmailModal