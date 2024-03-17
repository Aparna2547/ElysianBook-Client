import React from 'react'

const EditProfile = () => {
  return (
    <div>
        <div className="flex items-center h-screen w-full justify-center">
          <div className="max-w-xs">
            <div className="bg-white shadow-xl rounded-lg py-3">
              <div className="photo-wrapper p-2">
                <img
                  className="w-32 h-32 rounded-full mx-auto text black"
                  src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-image&psig=AOvVaw11L04RYVnmT8Ao7pvZFvyf&ust=1710689932977000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNirl9GO-YQDFQAAAAAdAAAAABAE"
                  alt="John Doe djhk"
                />
              </div>
              <div className="p-2">
                <form className="text-xs my-3">
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
                        placeholder="Name"
                        // value={name}
                        //   onChange={}
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
                      >Email </label>
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3'>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                      <label
                        className="appearance-none block w-full text-gray-700  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                      >Mobile
                      </label>
                    </div>
                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                      <input
                        className="appearance-none block w-full border-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="number"
                      //   value={mobile}
                      //   onChange={}
                      />
                    </div>
                  </div>
                </form>
                <div className="text-center my-3">
                  <button
                    className="text-xs bg-blue-800 text-white py-1 w-full  font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default EditProfile