import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Admin')
    const { setAToken, backendUrl } = useContext(AdminContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            console.log("Sending login request to:", backendUrl + '/api/admin/login')
            console.log("Payload:", { email, password })

            if (state === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })

                console.log("Server Response:", data)

                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                    toast.success("Logged in successfully!")
                } else {
                    toast.error(data.message || "Login failed.")
                }
            } else {
                toast.warning("Employee login not yet implemented.")
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message)
            toast.error(error.response?.data?.message || "Something went wrong. Check backend or credentials.")
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        type="email"
                        required
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        type="password"
                        required
                    />
                </div>
                <button className='bg-gradient-to-r from-primary to-emerald-500 text-white w-full py-2 rounded-md text-base'>Login</button>
                {
                    state === 'Admin'
                        ? <p>Employee Login? <span className='font-bold text-primary underline cursor-pointer' onClick={() => setState('Employee')}>Click here</span></p>
                        : <p>Admin Login? <span className='font-bold text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login
