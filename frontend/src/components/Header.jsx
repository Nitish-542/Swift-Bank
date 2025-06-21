import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-primary to-orange-500 rounded-lg px-6 md:px-10 lg:px-20'>
      {/* Left */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointment <br /> With Us Today!
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm'>
            <img className='w-28' src={assets.group_profiles} alt="3 images of 3 different people in round shape" />
            <p>Simply browse through our extensive list of trusted members,<br className='hidden sm:block' /> schedule your appointment hustle-free.</p>
        </div>
        <a className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href="#speciality">
            Book appointment <img className='w-3' src={assets.arrow_icon} alt="Arrow pointing to the right" />
        </a>
      </div>
      {/* Right */}
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="A women standing in betwwen two men wearing suits" />
      </div>
    </div>
  )
}

export default Header
