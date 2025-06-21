import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>389 The Westway <br /> Ontario, Canada - M9R 0B4</p>
          <p className='text-gray-500'>Tel: +1(123) 456‑7890 <br /> Email: info@swiftbank.com</p>
          <p className='font-semibold text-lg text-gray-600'>CAREERS AT swiftbank</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300'>Explore Jobs</button>
        </div>
        <img className='w-full max-w-[360px] rounded-xl' src={assets.contact_image} alt="A woman looking at the left wearing pink suit and holding a laptop" />
      </div>
    </div>
  )
}

export default Contact
