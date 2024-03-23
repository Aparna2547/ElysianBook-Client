import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/User/NavBar/Navbar'
import SinglePageParlourDetails from '../../../Components/User/SinglePage/SinglePageParlourDetails'
import {  singleParlourDetails } from "../../../Api/user";
import {useParams} from "react-router-dom"
import DatePicker from "../../../Components/User/DatePicker"


const ParlourDetails = () => {
    const [parlourDetails,setParlourDetails] = useState({})
    const {id} = useParams()
    console.log(id);
    
    useEffect(()=>{
        const fetchParlour = async (id:string) =>{
            try{
                console.log('id',id)
                const res = await singleParlourDetails(id as string)
                console.log(res.data.data)
                setParlourDetails(res.data.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchParlour(id)
    },[])
  return (
    <>
       <Navbar/>

    <div className='pt-20 px-4 lg:px-10  bg-pink-50' style={{overflowX:'hidden'}}>
       <SinglePageParlourDetails ParlourDetails={parlourDetails} />
       <div className='py-3'>
       {/* <DatePicker/> */}
       </div>
    </div>
    </>
  )
}

export default ParlourDetails