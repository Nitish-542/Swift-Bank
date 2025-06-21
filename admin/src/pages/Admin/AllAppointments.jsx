import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Client</p>
          <p>Date & Time</p>
          <p>Staff Member</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_3fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 rounded-full' src={item.userData.image} alt="User's profile image" /> <p>{item.userData.name}</p>
            </div>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 rounded-full bg-gray-200' src={item.empData.image} alt="Staff member's profile image" /> <p>{item.empData.name}</p>
            </div>
            {item.cancelled
              ? <p className='text-red-500 text-sm font-medium'>Cancelled</p>
              : <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="A red cross icon" />}
          </div>
        ))}

      </div>
    </div>
  )
}

export default AllAppointments
