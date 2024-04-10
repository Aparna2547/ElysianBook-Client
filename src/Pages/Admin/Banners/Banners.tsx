import React, { useState, useRef ,useEffect} from 'react';
import Home from '../../../Components/Admin/Sidebar/Sidebarcheck'
import { addBanners ,getBanners,deleteBanner} from '../../../Api/admin';
import {toast} from "react-toastify"

const Banners = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [image, setImage] = useState('')
  const [banners,setBanners] = useState<string[]>([])
  const [bannerToUpload,setBannerToUpload] = useState<File[]>([])



  const fileInputRef = useRef(null)


  useEffect(()=>{
   const fetchData  = async () =>{
    const res = await getBanners()
    console.log('sss',res.data.data[0].banners)
    setBanners(res.data.data[0].banners)
   }
   fetchData()
    // let existingImage = ['https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png','https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png']
    // setBanners(existingImage)

  },[])


  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  }

  const handleFileChange = (imageURL:string,file:File) => {
    // setBanners((prevBanners:string[]) =>{
    //   const newBanners = [...prevBanners];
    //   newBanners[index] = imageURL;
    //   return newBanners;
    // })

    setBanners([...banners,imageURL])
    // existingImage.push(imageURL)
    setBannerToUpload([...bannerToUpload,file])
    console.log('jhj',bannerToUpload)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('inside handlesubmit')
    e.preventDefault()
   
    const formData = new FormData();
    bannerToUpload.map((banner)=>(
      formData.append('image',banner)
    ) )
    
    
    const res = await addBanners(formData)
    console.log('jjhgj',res)

    if(res?.data.data){
      return toast.success('banner upload successfully')
    }

  }

  const handleDelete = async(banner:string) =>{
    let arr = banners;
    console.log('fanhr',arr)

    arr.splice(arr.indexOf(banner),1)
    console.log('far',arr)

    setBanners([...arr])
    console.log('dkfsf')
    const res = await deleteBanner(banner)
    console.log(res)
  }


  return (
    <>
      <div className='flex overflow-x-hidden'>
        <div>
          <Home />
        </div>
        <form className='w-full'>
          <div>
            <h1 className='m-4 text-3xl font-bold'>Banners</h1>
          </div>
          <div className='w-full m-3 flex  gap-1 '>
            
          {['','',''].map((_,index)=>(
              <div className='w-2/6 bg-white'>
                {
                  banners[index]?(
                    <>
                    <div className='w-full border border-gray-300'>
                    <img src={banners[index]} alt="" />
                  </div>
                  <div className='m-1'><div className='bg-red-700 px-3 py-1 font-bold text-white cursor-pointer' onClick={()=>handleDelete(banners[index])}>Delete</div></div>
                  </>
                   ) :(
                    <>
                  <div>
                      <input
                        type="file"
                        id='image'
                        name='image'
                        // ref={fileInputRef}
                        // style={{ display: 'none' }}
                        onChange={(e)=>{
                          const files = e.target.files;
                          if(files && files.length >0){
                            const file = files[0];
                            const imageURL = URL.createObjectURL(file);
                            handleFileChange(imageURL,file)
    
                          }
                        }}
                      />
                  </div>
            {/* <div className='bg-blue-900 px-3 py-1 font-bold text-white cursor-pointer' onClick={handleButtonClick}>Browse Image</div> */}
            </>
                   )
                }
            
            </div>
            
          ))

          }



          </div>
<button className='bg-blue-700 px-3 w-full mx-5 ' type='submit' onClick={handleSubmit}>Change banners</button>

        </form>
      </div>
    </>
  )
}

export default Banners
