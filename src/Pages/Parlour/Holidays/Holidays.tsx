import React,{useState} from 'react'
import Sidebar from '../../../Components/Parlour/Sidebar/Sidebar'
import Calendar from 'react-calendar'
import { addHolidays } from '../../../Api/parlour'
import { toast } from 'react-toastify'


const Holidays = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);


  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() +7)

  const endDate = new Date(today)
  endDate.setDate(today.getDate()+30)

  // const handleDateChange = async (date:Date) =>{
  //   setDate(date)
  //   const index =  selectedDates.findIndex((d)=>d.getTime() ===date.getTime())

  //   if(index===-1){
  //     setSelectedDates([...selectedDates,date])
  //   }else{
  //     const updatedDates = [...selectedDates];
  //     updatedDates.splice(index,1);
  //     setSelectedDates(updatedDates)
  //   }
  //   console.log(date)
   
  // }


  // const handleDateChange = async (date:Date) =>{
  //   setDate(date)
  //   console.log(date)
  //   const res = await addHolidays([date])
  //   console.log(res)
  // }

  const handleDateChange = (selectedDates:any) => {
    setSelectedDates(selectedDates);
    console.log(selectedDates)
  };


  const handleAddHolidays = async () =>{
    const res = await addHolidays(selectedDates)
    // console.log(res.status)
    if(res.status == 200){
      toast.success('Date added as holiday')
    }
  }

  return (
    <>
    <div className='flex gap-4'>
      <Sidebar/>   
      <div className='w-full m-28 flex gap-1'>
    <div className='flex justify-center items-center h-full border border-gray-300 w-2/6'>
    <div>
      Select the days for off
    </div>
    </div>
    <div className='flex justify-center items-center h-full border p-4 border-gray-300 w-4/6'>
      <div>
        <Calendar
              value={selectedDates}
              onChange={handleDateChange}
              // selectRange={true}
              minDate={startDate}
              maxDate={endDate}
              />
            <div className='flex items-center justify-end'>
          <button onClick={handleAddHolidays}  className='bg-blue-700 mt-2 text-white  px-3 py-1'>Add Holidays</button>
          </div>
          </div>
      </div>
    </div>
    </div>

    </>
  )
}

export default Holidays