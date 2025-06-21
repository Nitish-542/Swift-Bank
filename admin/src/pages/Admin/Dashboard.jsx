import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, dashData, getDashData, cancelAppointment } = useContext(AdminContext)

  const {slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500'>
          <img className='w-20' src={assets.staff_icon} alt="2 people icon looking like staff members" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.employees}</p>
            <p className='text-gray-500'>Staff Members</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500'>
          <img className='w-20' src={assets.user_icon} alt="3 people icon representing users" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.clients}</p>
            <p className='text-gray-500'>Users</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500'>
          <img className='w-20' src={assets.appointments_icon} alt="an icon where 2 people are shaking hands" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-500'>Appointments</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="An icon of a list in blue color" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='w-10 rounded-full' src={item.empData.image} alt="Staff member's profile image" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.empData.name}</p>
                  <p className='text-gray-600'>Booking on {slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                </div>
                {item.cancelled
                  ? <p className='text-red-500 text-sm font-medium'>Cancelled</p>
                  : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="A red cross icon" />}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
