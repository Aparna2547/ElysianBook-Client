import React from 'react'
import Navbar from '../../../Components/User/NavBar/Navbar'
import Banner from '../../../Components/User/Banner/Banner'
import Side from '../../../Components/User/Sidebar/ParlourList'
import { CarouselDefault } from '../../../Components/User/Carousel/Carousel'

const Home = () => {
  return (
   <>  
     <Navbar/>
     <CarouselDefault/>
    {/* <Banner/> */}
    {/* <Side/> */}
    </>

  )
}

export default Home