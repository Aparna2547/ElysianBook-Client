import React, { useState,useEffect } from 'react';
import Sidebar from '../../../Components/Parlour/Sidebar/Sidebar';
import { vendorProfile } from '../../../Api/parlour';
import {toast} from 'react-toastify'


type ProfileType ={
  vendorImage:string,
  parlourName:string,
  name:string,
  email:string,
  status:string,
  password:string
}

const EditProfile  = () => {
  const [profile,setProfile] = useState<ProfileType | null>(null)
  const [formData,setFormData] = useState({
    vendorImage:[],
    name:'',
    email:'',
    parlourName:'',
    status:''
  })  
 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await vendorProfile();
        console.log(res.data.data);
        setProfile(res.data.data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: res.data.data.name,
          vendorImage: res.data.data.vendorImage || [], 
        }));
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
      if(formData.name.trim().length ==0){
        toast.error('enter name')
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name',formData.name)
      if(formData.vendorImage && formData.vendorImage.length >0){
        formData.vendorImage.forEach((file:File)=>{
          formDataToSend.append("vendorImage",file)
        })
      }

      console.log('profile',formData)
    }catch(error){
    console.log(error)
    }
  }

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className="flex items-center h-screen w-full justify-center">
          <div className="max-w-xs">
            <form className="text-xs my-3" onSubmit={handleSubmit}>
            <div className="bg-white shadow-xl rounded-lg py-3">

              <div className="photo-wrapper p-2">

                 <img
                    className="w-32 h-32 rounded-full mx-auto"
                    src=  'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='
                    alt="John Doe"
                  />
              </div>
              <div className="p-2">
                  <div className='flex flex-wrap -mx-3 '>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                      <label
                        className="appearance-none block w-full text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      >
                        Name
                      </label>
                    </div>
                    <div className="w-full md:w-3/4 px-3 md:mb-0">
                      <input
                        className="appearance-none block w-full border-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        placeholder={profile ? profile.name : ''}

                        value={formData.name}
                          onChange={(e)=>setFormData({...formData,name:e.target.value})}
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 '>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                      <label
                        className="appearance-none block w-full text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      >
                        Email
                      </label>
                    </div>
                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                      <label
                        className="appearance-none block w-full border-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      > {profile ? profile.email : ''} </label>
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3'>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                      <label
                        className="appearance-none block w-full text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                      >Password
                      </label>
                    </div>
                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                    <label
                        className="appearance-none block w-full text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                      >******
                      </label>
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3'>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                      <label
                        className="appearance-none block w-full text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                      >Parlour Name
                      </label>
                    </div>
                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                    <label
                        className="appearance-none block w-full text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                      >
                      {profile ? profile.parlourName : ''}

                      </label>
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3'>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                      <label
                        className="appearance-none block w-full text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                      >Parlour Status
                      </label>
                    </div>
                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                    <label
                        className="appearance-none block w-full text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                      >{profile ? profile.status : ''}

                      </label>
                    </div>
                  </div>
                <div className="text-center my-3">
                  <button
                  type='submit'
                    className="text-xs bg-blue-800 text-white py-1 w-full  font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
