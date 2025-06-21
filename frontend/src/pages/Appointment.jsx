import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedEmp from '../components/RelatedEmp'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { empId } = useParams()
  const { employees, backendUrl, token, getEmpData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [empInfo, setEmpInfo] = useState(null)
  const [empSlots, setEmpSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [weatherForecast, setWeatherForecast] = useState(null)

  const fetchEmpInfo = async () => {
    const empInfo = employees.find(emp => emp._id === empId)
    setEmpInfo(empInfo)
  }

  const getAvailableSlots = async () => {
    setEmpSlots([])

    // getting current date
    let today = new Date()

    if (!empInfo || !empInfo.slots_booked) {
      // Early return if empInfo or slots_booked is null/undefined
      return;
    }

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "-" + month + "-" + year
        const slotTime = formattedTime

        const isSlotAvailable = empInfo.slots_booked[slotDate] && empInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          // adding slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        // Incrementing current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setEmpSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please create an account to book an appointment!")
      return navigate('/login')
    }

    try {
      const date = empSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "-" + month + "-" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { empId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getEmpData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const fetchWeatherForecast = async (date) => {
    const API_KEY = '44b670c2af79a6c9cc55c5534373fa6c';
    const city = 'Toronto';

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      const forecastList = response.data.list;

      // Find the forecast for the selected date
      const selectedDateForecast = forecastList.find(item => {
        const forecastDate = new Date(item.dt * 1000);
        return forecastDate.getDate() === date.getDate() &&
          forecastDate.getMonth() === date.getMonth() &&
          forecastDate.getFullYear() === date.getFullYear();
      });

      if (selectedDateForecast) {
        setWeatherForecast({
          temperature: selectedDateForecast.main.temp,
          description: selectedDateForecast.weather[0].description,
          icon: selectedDateForecast.weather[0].icon,
        });
      } else {
        // If no forecast is available for the selected date
        const lastForecast = forecastList[forecastList.length - 1];
        setWeatherForecast({
          temperature: lastForecast.main.temp,
          description: lastForecast.weather[0].description,
          icon: lastForecast.weather[0].icon,
          isEstimate: true,
        });
      }
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      setWeatherForecast(null);
    }
  };

  const handleDateSelection = (index) => {
    setSlotIndex(index);
    const selectedDate = empSlots[index][0].datetime;
    fetchWeatherForecast(selectedDate);
  };

  useEffect(() => {
    fetchEmpInfo()
  }, [employees, empId])

  useEffect(() => {
    getAvailableSlots()
  }, [empInfo])

  useEffect(() => {
    console.log(empSlots);
  }, [empSlots])

  return empInfo && (
    <div>
      {/* Employee Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-gradient-to-r from-primary to-orange-500 w-full sm:max-w-72 rounded-lg' src={empInfo.image} alt="Staff member's profile image" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {empInfo.name} <img className='w-5' src={assets.verified_icon} alt="A verified icon with a tick mark in blue color" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{empInfo.degree} - {empInfo.position}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{empInfo.experience} Year</button>
          </div>

          <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img className='w-3.5' src={assets.info_icon} alt="Info icon with a letter i in a circle" /></p>
          <p className='text-sm text-gray-500 max-w-[800px] mt-1'>{empInfo.about}</p>

          <div className='mt-4 flex items-center gap-4'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Languages</p>
              <p className='text-sm text-gray-500 '>English, French</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            empSlots.length && empSlots.map((item, index) => (
              <div onClick={() => handleDateSelection(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-gradient-to-r from-primary to-orange-500 text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        {/* Weather Forecast */}
        {weatherForecast && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold">Weather Forecast</h3>
            <div className="flex items-center">
              <img src={`http://openweathermap.org/img/w/${weatherForecast.icon}.png`} alt="Weather icon" />
              <p className="ml-2">
                {weatherForecast.temperature}°C, {weatherForecast.description}
                {weatherForecast.isEstimate}
              </p>
            </div>
          </div>
        )}

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {empSlots.length && empSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light text-gray-900 flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-gradient-to-r from-primary to-orange-500 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-gradient-to-r from-primary to-orange-500 text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
      </div>

      {/* related employees */}
      <RelatedEmp empId={empId} speciality={empInfo.speciality} />
    </div>
  )
}

export default Appointment