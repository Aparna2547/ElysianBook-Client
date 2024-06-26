    import { useEffect, useState } from 'react'
    import Navbar from '../../../Components/User/NavBar/Navbar'
    import SinglePageParlourDetails from '../../../Components/User/SinglePage/SinglePageParlourDetails'
    import {  singleParlourDetails } from "../../../Api/user";
    import {useParams} from "react-router-dom"
    

    const ParlourDetails = () => {
        const [parlourDetails, setParlourDetails] = useState({
            parlourName: "",
            landmark: "",
            name: "",
            email: "",
            locality: "",
            openingTime: "",
            closingTime: "",
            facilities: [],
            banners: [],
            id: "",
            contact:''
        });
        const {id} = useParams()
        
        useEffect(()=>{
            const fetchParlour = async (id:string) =>{
                try{
                    const res = await singleParlourDetails(id as string)
                    setParlourDetails(res.data.data)
                }catch(error){
                }
            }
            fetchParlour(id as string)
        },[])
    return (
        <>
        <Navbar/>

        <div className='pt-20 px-4 lg:px-10  bg-pink-50' style={{overflowX:'hidden'}}>
        {/* <div className='py-3'>
        <DatePicker/>
        </div> */}
        <SinglePageParlourDetails ParlourDetails={parlourDetails} />
        
        </div>
        </>
    )
    }

    export default ParlourDetails