import React,{useState,useEffect} from 'react'
import Navbar from "../../Components/User/NavBar/Navbar"
import { userprofile,userLogout } from '../../Api/user'
import {useDispatch} from "react-redux"
import {logout} from "../../Store/slice/authSlice"
import  ChangeNameModal from "../../Components/User/ChangeProfileModals/ChangeNameModal"
import  ChangeEmailModal from "../../Components/User/ChangeProfileModals/ChangeEmailModal"
import  ChangePasswordModal from "../../Components/User/ChangeProfileModals/ChangePasswordModal"
import  ChangeImageModal from "../../Components/User/ChangeProfileModals/ChangeImageModal"



type ProfileType = {
    image:string ,
    name:string,
    email:string,
    password:string
}

const ProfileDetails = () => {
    const [profile,setProfile] = useState<ProfileType | null>(null)
    const [formData,setFormData] = useState({
        image:[],
        name:'',
        email:'',
        password:''
    })
    
    const [emailProps,setEmailProps] = useState('')
    const [nameModal,setNameModal] = useState(false)
    const [passwordModal,setPasswordModal] = useState(false)
    const [emailModal,setEmailModal] = useState(false)
    const [imageModal,setImageModal] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchProfile = async () =>{
            try{
                const res = await userprofile();
                console.log(res)
                setProfile(res.data.data)
                setEmailProps(res.data.data.email)
            }catch(error){
                console.log(error)
            }
        }
        fetchProfile()
    },[nameModal,emailModal,passwordModal])

    const handleLogout=async ()=>{
        try{
            const res = await userLogout()
            dispatch(logout())
            return res
        }catch(error){
            console.log(error)
        }
    }


  return (
    <>
    <Navbar/>
     <div className="rounded p-6 w-full md:w-1/2 ">
            <div className="pb-6 flex justify-between items-center border-b-2 mb-2">
                <div>
                    <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">
                        Name
                    </label>
                    <h1>{profile ? profile.name : ''}</h1>
                </div>
                <button onClick={()=>setNameModal(true)}className="py-1 px-3 bg-slate-600 text-sm text-white font-bold rounded-md">CHANGE</button>
            </div>
            <div className="pb-6 flex justify-between items-center border-b-2 mb-2">
                <div>
                    <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">
                        Email
                    </label>
                    <h1>{profile ? profile.email : ''}</h1>

                </div>
                <button onClick={()=>setEmailModal(true)} className="py-1 px-3 bg-slate-600 text-sm text-white font-bold rounded-md">CHANGE</button>
            </div>
            <div className="pb-6 flex justify-between items-center border-b-2 mb-2">
                <div>
                    <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">
                        Password
                    </label>
                    <h1>**************</h1>
                </div>
                <button  onClick={()=>setPasswordModal(true)} className="py-1 px-3 bg-slate-600 text-sm text-white font-bold rounded-md" >CHANGE</button>
            </div>

            <div>
                <button onClick={handleLogout} className='bg-red-700 px-5 text-white font-bold rounded-sm py-1'> LOGOUT</button>
            </div>
        </div>


        {nameModal && <ChangeNameModal setNameModal={setNameModal} />}
        {emailModal && <ChangeEmailModal setEmailModal={setEmailModal} emailProps={emailProps} />}
        {passwordModal && <ChangePasswordModal setPasswordModal={setPasswordModal} />}
        {/* {imageModal && <ChangeImageModal setImageModal={setImageModal} />} */}
    </>


  )
}

export default ProfileDetails