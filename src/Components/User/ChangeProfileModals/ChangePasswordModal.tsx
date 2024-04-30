import React,{useState} from 'react'
import { toast } from 'sonner'
import {changeUserPassword } from '../../../Api/user'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../../Store/slice/authSlice';


interface ModalProps{
  setPasswordModal:(value:boolean)=>void
}
const ChangePasswordModal = ({setPasswordModal}:ModalProps) => {
  const [currentPassword,setCurrentPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const changePasswordHandle = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try {
      if(currentPassword.trim().length<6){
        toast.error("Password length should be minimum 6")
        return
      }else if(newPassword.trim().length<6){
        toast.error("Password length should be minimum 6")
        return

      }else if(confirmPassword.trim().length<6){
        toast.error("Password length should be minimum 6")
        return

      }
      else if(newPassword!==confirmPassword){
        toast.error("password not match")
        return
      }

  
        const res = await changeUserPassword(currentPassword,newPassword)
        console.log(res.data.data)
        console.log('password changed')
        if(res.data.data){
          toast.success('password changed successfully.Please Login')
          dispatch(logout())
          navigate('/parlour')
        }
    

    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div>
       <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
  <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
   <button onClick={()=>setPasswordModal(false)}> <svg
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
      <h4 className="text-3xl text-[#333] font-extrabold"> Change your name</h4>
     
    </div>
    <form className="space-y-4" onSubmit={changePasswordHandle}>
      <div className="relative flex items-center">
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e)=>setCurrentPassword(e.target.value)}
          className="px-4 py-3 bg-white text-[#333] w-full text-sm border-2 outline-[#007bff] rounded-lg"
        />
     
      </div>
      <div className="relative flex items-center">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          className="px-4 py-3 bg-white text-[#333] w-full text-sm border-2 outline-[#007bff] rounded-lg"
        />
     
      </div>
      <div className="relative flex items-center">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className="px-4 py-3 bg-white text-[#333] w-full text-sm border-2 outline-[#007bff] rounded-lg"
        />
     
      </div>
     
     
      <button
        type="submit"
        className="px-6 py-2.5 !mt-8 w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full"
      >
       Save
      </button>
    </form>
    
  </div>
</div>
    </div>
  )
}

export default ChangePasswordModal