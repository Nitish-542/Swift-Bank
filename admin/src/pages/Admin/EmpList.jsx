import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const EmpList = () => {

  const { employees, aToken, getAllEmps, changeAvailability } = useContext(AdminContext)

  useEffect(()=>{
    if(aToken) {
      getAllEmps()
    }
  },[aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Employees</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          employees.map((item,index)=>(
            <div className='border border-green-200 rounded-xl max-w-56 overflow-hidden cursor-pointer' key={index}>
              <img className='bg-green-50 hover:bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500' src={item.image} alt="Staff member's profile image" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.position}</p>
                <div className='flex mt-2 items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default EmpList
