import React from 'react'

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";

const DatePicker = () => {
    const [selected, setSelected] = useState<Date>();
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index:any) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    console.log(selected)

    let items = ['','','','']

  return (

<div className='max-w-screen-xl mx-auto p-5 relative shadow-2xl bg-gray-100  pb-24'>
                <div>
                    <h1 className='text-center text-xl font-bold'>SELECT DATE AND TIME FOR BOOKING</h1>
                    <div className='flex justify-center items-center gap-4 md:gap-10'>
                        <div>
                            <DayPicker
                                mode="single"
                                selected={selected}
                                onSelect={setSelected}
                            />
                        </div>
                        <div>
                            <input type="time" />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='text-center font-bold text-xl'>SELECT SERVICES</h1>
                    <div className='flex flex-col items-center flex-wrap my-2 w-full'>
                        {items.map((_,index)=>(
                        <div className='border p-3 md:w-1/2 w-full  bg-white rounded-md' key={index}>
                            <div className='flex items-center justify-between pb-3 border-b cursor-pointer' onClick={() => toggleAccordion(index)}>
                                <h1 className='font-bold text-lg'>
                                    Category {index}
                                </h1>
                                <h1 className='text-xl' ><IoIosArrowDown/></h1>
                            </div>
                            {openIndex == index && 
                            <div className='py-3'>
                                <div className='flex gap-2 mb-3 w-full'>
                                    <div className=''>
                                        <img className='h-24' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTec-bM9oOpILDfWqZvfiyacv-DEfKuhFgTKA&usqp=CAU" alt="" />
                                    </div>
                                    <div className='flex justify-between items-start w-3/4'>
                                        <div>
                                            <h1 className='font-bold text-lg'>Item Name</h1>
                                            <h1>Item Price</h1>
                                            <h1>Item duration</h1>
                                            <h1>Description</h1>
                                        </div>
                                        <button className='py-1 px-3 bg-slate-600 rounded-md font-bold text-white'>Select</button>
                                    </div>
                                </div>
    
                                <div className='flex gap-2 mb-3 w-full'>
                                    <div className=''>
                                        <img className='h-24' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTec-bM9oOpILDfWqZvfiyacv-DEfKuhFgTKA&usqp=CAU" alt="" />
                                    </div>
                                    <div className='flex justify-between items-start w-3/4'>
                                        <div>
                                            <h1 className='font-bold text-lg'>Item Name</h1>
                                            <h1>Item Price</h1>
                                            <h1>Item duration</h1>
                                            <h1>Description</h1>
                                        </div>
                                        <button className='py-1 px-3 bg-slate-600 rounded-md font-bold text-white'>Select</button>
                                    </div>
                                </div>
                            
                            </div>}
                        </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        
    
  )
}

export default DatePicker