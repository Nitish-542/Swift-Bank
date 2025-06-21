import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token, getEmpData } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [reschedulingAppointment, setReschedulingAppointment] = useState(null)
  const [empSlots, setEmpSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancellingAppointmentId, setCancellingAppointmentId] = useState(null)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('-')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const openCancelModal = (appointmentId) => {
    setCancellingAppointmentId(appointmentId)
    setShowCancelModal(true)
  }

  const cancelAppointment = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId: cancellingAppointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getEmpData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setShowCancelModal(false)
      setCancellingAppointmentId(null)
    }
  }

  const getAvailableSlots = async (empId) => {
    setEmpSlots([])
    let today = new Date()
    const empInfo = appointments.find(app => app.empId === empId).empData

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        const slotDate = `${day}-${month}-${year}`
        const isSlotAvailable = !(empInfo.slots_booked[slotDate] && empInfo.slots_booked[slotDate].includes(formattedTime))

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setEmpSlots(prev => ([...prev, timeSlots]))
    }
  }

  const initiateReschedule = (appointmentId, empId) => {
    setReschedulingAppointment(appointmentId)
    setSlotIndex(0)
    setSlotTime('')
    getAvailableSlots(empId)
  }

  const rescheduleAppointment = async () => {
    if (!slotTime) {
      return toast.error("Please select a time slot")
    }

    try {
      const date = empSlots[slotIndex][0].datetime
      const slotDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

      const { data } = await axios.post(
        backendUrl + '/api/user/reschedule-appointment',
        { appointmentId: reschedulingAppointment, newSlotDate: slotDate, newSlotTime: slotTime },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getEmpData()
        setReschedulingAppointment(null)
        setEmpSlots([])
        setSlotTime('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="max-w-4xl mx-auto px-4">
      <p className='pb-3 mt-8 font-medium text-zinc-700 border-b'>My appointments</p>
      <div className="space-y-4 mt-4">
        {appointments.map((item, index) => (
          <div className='flex flex-col sm:flex-row gap-4 py-4 border-b' key={index}>
            <div className="sm:w-1/4">
              <img className='w-full sm:w-32 bg-green-50 border border-green-200 rounded' src={item.empData.image} alt="Staff member's profile image" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.empData.name}</p>
              <p>{item.empData.position}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.empData.address.line1}</p>
              <p className='text-xs'>{item.empData.address.line2}</p>
              <p className='text-sm mt-2'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className='sm:w-1/3 flex flex-col gap-2 justify-center'>
              {!item.cancelled && reschedulingAppointment !== item._id && (
                <button
                  onClick={() => initiateReschedule(item._id, item.empId)}
                  className='text-sm text-center w-full py-2 border rounded bg-gradient-to-r from-primary to-orange-500 text-white hover:scale-105 transition-all duration-300'
                >
                  Reschedule appointment
                </button>
              )}
              {reschedulingAppointment === item._id && (
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2 items-center w-full overflow-x-auto mt-2'>
                    {empSlots.map((slot, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSlotIndex(idx)}
                        className={`text-center py-2 px-3 rounded-full cursor-pointer text-xs ${slotIndex === idx ? 'bg-gradient-to-r from-primary to-emerald-500 text-white' : 'border border-gray-200'}`}
                      >
                        <p>{slot[0] && daysOfWeek[slot[0].datetime.getDay()]}</p>
                        <p>{slot[0] && slot[0].datetime.getDate()}</p>
                      </div>
                    ))}
                  </div>
                  <div className='flex flex-wrap gap-2 w-full mt-2'>
                    {empSlots[slotIndex]?.map((slot, idx) => (
                      <p
                        key={idx}
                        onClick={() => setSlotTime(slot.time)}
                        className={`text-xs font-light flex-shrink-0 px-3 py-1 rounded-full cursor-pointer ${slot.time === slotTime ? 'bg-gradient-to-r from-primary to-emerald-500 text-white' : 'text-gray-400 border border-gray-300'}`}
                      >
                        {slot.time.toLowerCase()}
                      </p>
                    ))}
                  </div>
                  <button
                    onClick={rescheduleAppointment}
                    className='text-sm text-center w-full py-2 border rounded bg-gradient-to-r from-primary to-emerald-500 text-white hover:scale-105 transition-all duration-300'
                  >
                    Confirm Reschedule
                  </button>
                  <button
                    onClick={() => {
                      setReschedulingAppointment(null)
                      setEmpSlots([])
                      setSlotTime('')
                    }}
                    className='text-sm text-center w-full py-2 border rounded bg-red-500 text-white hover:scale-105 transition-all duration-300'
                  >
                    Cancel
                  </button>
                </div>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => openCancelModal(item._id)}
                  className='text-sm text-white bg-red-500 text-center w-full py-2 border rounded hover:scale-105 transition-all duration-300'
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && (
                <button className='w-full py-2 border border-red-500 rounded text-red-500 text-sm'>
                  Appointment Cancelled!
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Are you sure you want to cancel the appointment?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelAppointment}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyAppointments