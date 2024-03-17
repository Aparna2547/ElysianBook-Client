import React from 'react'

const Profile = () => {
  return (
    <div>
        <div className="flex items-center h-screen w-full justify-center">
  <div className="max-w-xs">
  {/* {parlourInfo ?  */}
    <div className="bg-white shadow-xl rounded-lg py-3">

      <div className="photo-wrapper p-2">
        <img
          className="w-32 h-32 rounded-full mx-auto"
        //   src={parlourInfo.image ?
        //   parlourInfo.image:
        //   'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='}
        // }
          src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
          alt="John Doe"
        />
      </div>
      <div className="p-2">
        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
         {/* {parlourInfo.vendorNa} */}
        </h3>
        
        <table className="text-xs my-3">
          <tbody>
           
            <tr>
              <td className="px-2 py-2 text-gray-500 font-semibold">Parlour Name</td>
              <td className="px-2 py-2">Top studio</td>
            </tr>
            <tr>
              <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
              <td className="px-2 py-2">john@exmaple.com</td>
              <td className="px-2 py-2"><button className='bg-blue-800 text-white font-bold px-3 py-1'>Change</button></td>
            </tr>
            <tr>
              <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
              <td className="px-2 py-2">+977 9955221114</td>
            </tr>
           
          </tbody>
        </table>
        <div className="text-center my-3">
          <button
            className="text-xs bg-blue-800 text-white py-1 w-full  font-medium"
          >
            Edit Profile
          </button>
          <button
            className="text-xs  bg-blue-800  text-white py-1 w-full font-medium"
          >
           Change Password
          </button>
        </div>
      </div>
    </div>
{/* } */}
  </div>
</div>
    </div>
  )
}

export default Profile