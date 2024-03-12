import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/User/NavBar/Navbar'
import SinglePageComponent from '../../../Components/SinglePageParlour/SinglePageComponent'
import {  singleParlourDetails } from "../../../Api/user";
import {useParams} from "react-router-dom"


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

    <div>
       <SinglePageComponent ParlourDetails={parlourDetails} />
    </div>
    </>
  )
}

export default ParlourDetails