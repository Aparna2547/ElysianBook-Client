import React from 'react'
import Home from '../../../Components/Admin/Sidebar/Sidebarcheck'
import Form from '../../../Components/Admin/Form'
const Dashboard = () => {
  return (
    <div className='flex'>
    <Home/>
    <div className='mx-7'>
    <Form/>

    </div>
    </div>
  )
}

export default Dashboard