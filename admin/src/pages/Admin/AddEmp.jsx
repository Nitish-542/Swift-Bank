import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'

const AddEmp = () => {

  const [empImg, setEmpImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [experience,setExperience] = useState('1 Year')
  const [about,setAbout] = useState('')
  const [speciality,setSpeciality] = useState('Personal Loans')
  const [position,setPosition] = useState('')
  const [degree,setDegree] = useState('')
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (!empImg) {
        return toast.error('Image not selected')
      }

      const formData = new FormData()

      formData.append('image',empImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('position',position)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1, line2:address2}))

      // Checking form data

      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`);
      })
      
      const {data} = await axios.post(backendUrl + '/api/admin/add-emp', formData, {headers:{ aToken }})
      
      if (data.success) {
        toast.success(data.message)
        setEmpImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setPosition('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add an Employee</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="emp-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={empImg ? URL.createObjectURL(empImg) :assets.upload_area} alt="Profile icon" />
          </label>
          <input onChange={(e)=>setEmpImg(e.target.files[0])} type="file" id='emp-img' hidden />
          <p>Upload employee <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Employee Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Enter employee name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Employee email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-gray-300 rounded px-3 py-2' type="email" placeholder='Enter employee email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Employee Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-gray-300 rounded px-3 py-2' type="password" placeholder='Enter employee password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border border-gray-300 rounded px-3 py-2' name="" id="">
                <option value="1">1 Year</option>
                <option value="2">2 Year</option>
                <option value="3">3 Year</option>
                <option value="4">4 Year</option>
                <option value="5">5 Year</option>
                <option value="6">6 Year</option>
                <option value="7">7 Year</option>
                <option value="8">8 Year</option>
                <option value="9">9 Year</option>
                <option value="10">10 Year</option>
              </select>
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border border-gray-300 rounded px-3 py-2' name="" id="">
                <option value="Personal Loans">Personal Loans</option>
                <option value="Mortgage Services">Mortgage Services</option>
                <option value="Savings & Checking Accounts">Savings & Checking Accounts</option>
                <option value="Credit Card Services">Credit Card Services</option>
                <option value="Investment and Wealth Management">Investment and Wealth Management</option>
                <option value="Business Banking Solutions">Business Banking Solutions</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Position</p>
              <input onChange={(e)=>setPosition(e.target.value)} value={position} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Enter employee position' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Enter employee education' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Address line 1' required />
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border border-gray-300 rounded px-3 py-2' type="text" placeholder='Address line 2' required />
            </div>
          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Employee</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded border-gray-300' placeholder='Enter employee details' rows={5} required />
        </div>
        <button type='submit' className='bg-gradient-to-r from-primary to-emerald-500 px-10 py-3 mt-4 text-white rounded-full'>Add Employee</button>
      </div>
    </form>
  )
}

export default AddEmp
