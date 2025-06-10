import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` } to={'/admin-dashboard'}>
                <img src={assets.home_icon} alt="A house border icon and a smile in it" />
                <p>Dashboard</p>
            </NavLink>

            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` } to={'/all-appointments'}>
                <img src={assets.appointment_icon} alt="A calender icon" />
                <p>Appointments</p>
            </NavLink>

            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` } to={'/add-employee'}>
                <img src={assets.add_icon} alt="A plus sign in a rounded square border" />
                <p>Add Employee</p>
            </NavLink>

            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` } to={'/employee-list'}>
                <img src={assets.people_icon} alt="A profile icon" />
                <p>Employee list</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
