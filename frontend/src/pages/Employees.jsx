import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Employees = () => {

  const { speciality } = useParams()
  const [filterEmp, setFilterEmp] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { employees } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterEmp(employees.filter(emp => emp.speciality === speciality))
    } else {
      setFilterEmp(employees)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[employees, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the service specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-2 px-4 border border-gray-600 rounded text-md transition-all sm:hidden ${showFilter ? 'bg-gradient-to-r from-primary to-emerald-500 text-white border-none' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=> speciality === 'Personal Loans' ? navigate('/employees') : navigate('/employees/Personal Loans')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer ${speciality === "Personal Loans" ? "bg-green-50 text-black" : ""}`}>Personal Loans</p>
          <p onClick={()=> speciality === 'Mortgage Services' ? navigate('/employees') : navigate('/employees/Mortgage Services')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer ${speciality === "Mortgage Services" ? "bg-green-50 text-black" : ""}`}>Mortgage Services</p>
          <p onClick={()=> speciality === 'Savings & Checking Accounts' ? navigate('/employees') : navigate('/employees/Savings & Checking Accounts')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer ${speciality === "Savings & Checking Accounts" ? "bg-green-50 text-black" : ""}`}>Savings & Checking Accounts</p>
          <p onClick={()=> speciality === 'Credit Card Services' ? navigate('/employees') : navigate('/employees/Credit Card Services')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer ${speciality === "Credit Card Services" ? "bg-green-50 text-black" : ""}`}>Credit Card Services</p>
          <p onClick={()=> speciality === 'Investment and Wealth Management' ? navigate('/employees') : navigate('/employees/Investment and Wealth Management')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer ${speciality === "Investment and Wealth Management" ? "bg-green-50 text-black" : ""}`}>Investment and Wealth Management</p>
          <p onClick={()=> speciality === 'Business Banking Solutions' ? navigate('/employees') : navigate('/employees/Business Banking Solutions')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer ${speciality === "Business Banking Solutions" ? "bg-green-50 text-black" : ""}`}>Business Banking Solutions</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterEmp.map((item,index)=>(
              <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-orange-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                  <img className='bg-orange-50' src={item.image} alt="Staff member's profile image" />
                  <div className='p-4'>
                      <div className='flex items-center gap-2 text-sm text-center text-orange-500'>
                          <p className='w-2 h-2 bg-orange-500 rounded-full'></p><p>Available</p>
                      </div>
                      <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                      <p className='text-gray-600 text-sm'>{item.position}</p>
                  </div>
              </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Employees
