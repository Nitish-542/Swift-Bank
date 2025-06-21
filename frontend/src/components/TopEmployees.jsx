import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopEmployees = () => {

    const navigate = useNavigate()
    const {employees} = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-5 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Staff Members to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted staff.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {employees.slice(0,10).map((item,index)=>(
            <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-green-50' src={item.image} alt="Staff member's profile image" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-orange-500'>
                        <p className='w-2 h-2 bg-orange-500 rounded-full'></p><p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.position}</p>
                </div>
            </div>
        ))}
      </div>
      <button onClick={()=>{ navigate('/employees'); scrollTo(0,0) }} className='bg-gradient-to-r from-primary to-orange-500 text-white px-12 py-3 rounded-full mt-10 hover:scale-105 transition-all duration-300'>more</button>
    </div>
  )
}

export default TopEmployees
