import React from 'react'
import Navbar from '../../../Components/User/NavBar/Navbar'
import Banner from '../../../Components/User/Banner/Banner'
import Side from '../../../Components/User/Sidebar/ParlourList'
import { CarouselDefault } from '../../../Components/User/Carousel/Carousel'
import UserHome from "../../../Components/User/UserHome"

const Home = () => {
  return (
   <>  
     <Navbar/>
    <UserHome/>
    </>

  )
}

export default Home