import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../User/NavBar/Navbar'
import Slider from "react-slick"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import searchImage from '../../assets/home4.jpg'
import book from '../../assets/home6.jpeg'
import parlour from '../../assets/home5.jpg'

const UserHome = () => {



    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='pt-16'>
                <div className='overflow-hidden p-4'>
                    <Slider {...settings}>
                        <div className='rounded-2xl overflow-hidden'>
                            <img className='w-full' src="https://t3.ftcdn.net/jpg/03/15/34/90/360_F_315349043_6ohfFyx37AFusCKZtGQtJR0jqUxhb25Y.jpg" alt="" />
                        </div>
                        <div className='rounded-2xl overflow-hidden'>
                            <img className='w-full' src="https://t3.ftcdn.net/jpg/03/15/34/90/360_F_315349043_6ohfFyx37AFusCKZtGQtJR0jqUxhb25Y.jpg" alt="" />
                        </div>
                        <div className='rounded-2xl overflow-hidden'>
                            <img className='w-full' src="https://t3.ftcdn.net/jpg/03/15/34/90/360_F_315349043_6ohfFyx37AFusCKZtGQtJR0jqUxhb25Y.jpg" alt="" />
                        </div>
                    </Slider>
                </div>
                <div className='px-10 md:px-10 lg:px-60 my-8 py-4 space-y-20 bg-purple-100'>
                    <div className='flex flex-wrap lg:flex-nowrap overflow-hidden gap-3'>
                        <div className='w-full lg:w-1/2  flex justify-center' >
                            <img className='rounded-3xl overflow-hidden w-[25rem]' src={searchImage} alt="" />
                        </div>
                        <div className='lg:w-1/2 flex items-center justify-center text-center text-pink-500'>
                            <h1 className='font-bold text-3xl'>
                                Discovering the nearest beauty parlour from home, where pampering meets convenience.
                            </h1>
                        </div>
                    </div>
                    <div className='flex flex-wrap lg:flex-nowrap'>
                        <div className='lg:w-1/2 flex items-center justify-center text-center order-2 lg:order-1' >
                            <h1 className='font-bold text-4xl text-pink-500'>
                                From the comfort of home, browsing, selecting, and booking the perfect service. Convenience meets luxury with just a few clicks.
                            </h1>
                        </div>
                        <div className='w-full lg:w-1/2  flex justify-center order-1 lg:order-2'>
                            <img className='rounded-3xl overflow-hidden w-[25rem]' src={book} alt="" />
                        </div>

                    </div>
                    <div className='flex flex-wrap lg:flex-nowrap'>
                        <div className='w-full lg:w-1/2  flex justify-center'>
                            <img className='rounded-3xl overflow-hidden w-[25rem]' src={parlour} alt="" />
                        </div>
                        <div className='lg:w-1/2 flex items-center justify-center text-center text-pink-500'>
                            <h1 className='font-bold text-4xl'>
                                Instant luxury at your fingertips! No more waiting, just pure pampering.
                            </h1>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default UserHome