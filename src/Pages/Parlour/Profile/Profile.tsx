import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Components/Parlour/Sidebar/Sidebar';
import { vendorProfile,changeName ,vendorForgotPassword} from '../../../Api/parlour';
import {Link} from "react-router-dom"
import {toast} from 'react-toastify'
import ChangePasswordModal from "../../../Components/ChangePassword/ChangePasswordModal"
import ChangeEmailModal from '../../../Components/ChangePassword/ChangeEmailModal';

type ProfileType = {
  vendorImage: string,
  parlourName: string,
  name: string,
  email:string,
  status:string,
  password:string,

}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [input,setInput] = useState(false)
  const [name,setName] = useState<String>('')
  const [passwordModal,setPasswordModal] = useState(false)
  const [emailModal,setEmailModal] = useState(false)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await vendorProfile();
        console.log(res.data.data);
        setProfile(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, [emailModal]);

  //chanfe name
  const nameChange = () =>{
    setInput(true)
    setName(profile?.name as string);
  }

  const changeNameSubmit = async () => {
    try {
      if (name === profile?.name || name.trim().length < 3) {
        toast.error('Please enter a valid name');
        return;
      }
  
      const res = await changeName(name as string);
  
      if (res?.data.data) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          name: name as string,
        }));
        setInput(false);
        toast.success('Name changed');
      } else {
        toast.error('Failed to change name');
      }
    } catch (error) {
      console.error('Error occurred while changing name:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  // const handlePasswordModal = async ()=>{
  //   try{
  //     setPasswordModal(true)

  //   }catch(error){
  //     console.error('Error occurred while changing name:', error);
  //     toast.error('An error occurred. Please try again.');
  //   }
  // }

 
  
  
  return (
    <>
      <div className='flex bg-gray-100' style={{ overflowY: 'hidden' }}>
        <Sidebar />
        <div className="flex items-center h-screen w-full justify-center">
          <div className="max-w-xs">
          <h1 className='text-center'>PROFILE</h1>

            {profile && (
              <div className="bg-white shadow-xl rounded-lg py-3">
                <div className="p-2">
                  
                  <table className="text-xs my-3">
                    <tbody>
                    <tr>
                        <td className="px-2 py- text-gray-500 font-semibold"> Name</td>
                        {!input ?
                          <>
                            <td className="px-2 py-2">
                            <h2>{profile.name ?profile.name : 'nill'}</h2> 
                          </td>
                          <td className="px-2 py-2">
                            <button onClick={nameChange} className='bg-blue-800 text-white font-bold px-3 py-1'>Change</button>
                            </td>
                            </>
                            :
                            <>
                            <td className="px-2 py-2">
                              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                          </td>
                          <td className="px-2 py-2">
                            <button  className='bg-blue-800 text-white font-bold px-3 py-1' onClick={changeNameSubmit}>Save</button>
                            </td>
                            </>
                        }
                      

                        </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Parlour Name</td>
                        <td className="px-2 py-2">
                          {profile.parlourName ? profile.parlourName : <p>nil</p>}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                        <td className="px-2 py-2">{profile.email}</td>
                        <td className="px-2 py-2"><button className='bg-blue-800 text-white font-bold px-3 py-1' onClick={()=>setEmailModal(true)}>Change</button></td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Password</td>
                        <td className="px-2 py-2">**********</td>
                        <td className="px-2 py-2"><button className='bg-blue-800 text-white font-bold px-3 py-1' 
                         data-modal-target="authentication-modal"
                         data-modal-toggle="authentication-modal"
                         onClick={()=>setPasswordModal(true)} >Change</button></td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Parlour Status</td>
                        <td className="px-2 py-2">{profile.status}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
 

 {passwordModal && <ChangePasswordModal setPasswordModal={setPasswordModal}  user={false}/>}
 {emailModal && <ChangeEmailModal  setEmailModal={setEmailModal} user={false} />}
    </>

  );
}

export default Profile;
