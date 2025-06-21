import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-20'>
        <img className='w-full md:max-w-[360px] rounded-xl' src={assets.about_image} alt="A woman with folded hands in yellow suit" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to SwiftBank, your reliable partner in navigating your financial journey with ease and confidence. At SwiftBank, we understand the complexities of managing personal finances, whether it’s securing a loan, handling investments, or simply managing your daily banking needs.</p>

          <p>SwiftBank is dedicated to innovation in financial technology. We continuously enhance our platform, integrating the latest advancements to provide a seamless and secure banking experience. Whether you're applying for your first mortgage or managing your wealth portfolio, SwiftBank is here to guide you through every step of the process.</p>

          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at SwiftBank is to empower individuals and businesses by offering smart and accessible financial solutions. We aim to simplify banking, bridging the gap between people and the financial services they need, all while providing exceptional support along the way.</p>
        </div>

      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r from-primary to-orange-500 hover:text-white text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r from-primary to-orange-500 hover:text-white text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r from-primary to-orange-500 hover:text-white text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
