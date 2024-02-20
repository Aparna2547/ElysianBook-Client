import React from 'react';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import {P1} from "../../../assets/p1.jpeg"
// import {P2} from "../../../assets/p2.jpeg"
import P3 from "../../../assets/p3.jpeg"


const Banner = () => {

    const settings = {
        dots: true,
        infinite: true, // Enables infinite looping
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enables automatic sliding
        autoplaySpeed: 4000, // Adjust the speed as needed
    };
  return (
    <div className="overflow-hidden">
    {/* <Slider {...settings}> */}
            <div className="">
            <img src={P3} alt="banner" width={500} height={200} />
            {/* <img src="src/assets/p2.jpeg" alt="banner" width={1524} height={563} />
            <img src="src/assets/p3.jpeg" alt="banner" width={1524} height={563} /> */}

            </div>
       
        
    {/* </Slider> */}
</div>
  );
};

export default Banner;
