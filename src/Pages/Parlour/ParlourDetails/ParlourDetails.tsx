import React from 'react'
import Form from '../../../Components/Parlour/Form'
import Sidebar from '../../../Components/Parlour/Sidebar/Sidebar'

const ParlourDetails = () => {
  return (
    <div className='flex'>
    <Sidebar/>
    <div className='px-6'>
        <Form/>

    </div>

    </div>
  )
}

export default ParlourDetails