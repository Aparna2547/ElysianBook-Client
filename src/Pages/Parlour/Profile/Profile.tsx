import { useState, useEffect } from 'react';
import Sidebar from '../../../Components/Parlour/Sidebar/Sidebar';
import { vendorProfile,changeName} from '../../../Api/parlour';
import { toast } from 'sonner'
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
  const [name,setName] = useState<string>('')
  const [passwordModal,setPasswordModal] = useState(false)
  const [emailModal,setEmailModal] = useState(false)
  const [email,setEmail] = useState('')
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await vendorProfile();
        console.log(res.data.data);
          setEmail(res.data.data.email)
    
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
  
      // if (res?.data.data) {
      //   setProfile((prevProfile) => ({
      //     ...prevProfile,
      //     name: name as string,
      //   }));
      //   setInput(false);
      //   toast.success('Name changed');
      // } else {
      //   toast.error('Failed to change name');
      // }

      if (res?.data.data) {
        setProfile((prevProfile:any) => ({
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

        <>
  {/* This is an example component */}
  <div className="h-full flex justify-center items-center mt-20 ms-10" style={{ display: 'flex', flexDirection: 'column' }}>
    <div className="border-b-2 block md:flex ">
      <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
        <div className="flex justify-between items-center mt-20">
          <span className="text-xl font-semibold block">Vendor Profile</span>
        </div><br /><br />
        <span className="text-gray-600">
          This information is secret so be careful
        </span>
       
      </div>
      <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
        
        {profile && (
 <div className="rounded  shadow p-6">
 <div className="pb-6">
 <label
     htmlFor="name"
     className="font-semibold text-gray-700 block pb-1"
   >
     Name
   </label>
   <div className="flex">
    {!input ?
    <>
    <label htmlFor="" className=" border border-1 border-gray-300  rounded-r px-4 py-2 w-full"
>
      {profile.name ? profile.name : ''}
    </label>
    <button className="py-1 ms-3 px-3 bg-blue-700 text-sm text-white font-bold rounded-md" onClick={nameChange}> Change</button>
    </>
    :
    <>
      <input
                // disabled=""
                id="name"
                className="border border-1 border-gray-300  rounded-r px-4 py-2 w-full"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}

              />
      <button className="py-1 ms-3 px-3 bg-blue-700 text-sm text-white font-bold rounded-md"  onClick={changeNameSubmit}>SAVE</button>
    </>
    }
   </div>
 </div>
 <div className="pb-4 mx-3">
   <label
     htmlFor="about"
     className="font-semibold text-gray-700 block pb-1 mb-2"
   >
     Email
   </label>
   <label htmlFor="" className=" border border-1 border-gray-300  rounded-r px-4 py-2 w-full"
>
      {profile.email}
    </label>
    <button className="py-1 ms-3 px-3 bg-blue-700 text-sm text-white font-bold rounded-md p-3" onClick={()=>setEmailModal(true)} > Change</button>
   
 </div>
 <div className="pb-4 mx-3">
 <label
     htmlFor="about"
     className="font-semibold text-gray-700 block pb-1 mb-2"
   >
     Password
   </label>
 <div className=''>
 <label htmlFor="" className=" border border-1 border-gray-300  rounded-r px-4 py-2 w-100"
>
      *******************************
    </label>
    <button className="py-1 ms-3 px-3 bg-blue-700 text-sm text-white font-bold rounded-md" onClick={()=>setPasswordModal(true)}> Change</button>
 </div>
   <span className="text-gray-600 pt-4 block opacity-70">
     Personal login information of your account
   </span>
 </div>
</div>
        )}
       
      </div>
    </div>
  </div>
</>






        {/* <div className="flex items-center h-screen w-full justify-center">
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
        </div> */}
      </div>
 

 {passwordModal && <ChangePasswordModal setPasswordModal={setPasswordModal}  user={false}/>}
 {emailModal && <ChangeEmailModal  setEmailModal={setEmailModal} emailProps={email} user={false} />}
    </>

  );
}

export default Profile;
