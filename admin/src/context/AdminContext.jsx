import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [employees,setEmployees] = useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllEmps = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-emps', {}, {headers:{aToken}})
            if (data.success) {
                setEmployees(data.employees)
                console.log(data.employees)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (empId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {empId}, {headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllEmps()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers:{aToken}})

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {

            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
                
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken,setAToken,
        backendUrl, employees, 
        getAllEmps, changeAvailability,
        appointments, setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData, getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider