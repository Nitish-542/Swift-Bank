import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* Left */}
        <div>
            <img className='mb-5 w-40' src={assets.logo} alt="A logo with a bank icon and a text called swiftbank in orange shades" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Experience seamless banking with our expert staff. Schedule your appointment today and let us help you achieve your financial goals.</p>
        </div>

        {/* Center */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <NavLink to = '/'><li>Home</li></NavLink>
              <NavLink to = '/about'><li>About us</li></NavLink>
              <NavLink to = '/contact'><li>Contact</li></NavLink>
              <li>Privacy policy</li>
            </ul>
        </div>

        {/* Right */}
        <div>
            <p className='text-xl font-medium mb-5'>STAY IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1(123) 456-7890</li>
                <li>info@Swiftbank.com</li>
            </ul>
        </div>
      </div>
      {/* Copyright */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>&copy; Copyright 2025 - SwiftBank All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
