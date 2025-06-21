import validator from 'validator'
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import empModel from '../models/empModel.js'
import appointmentModel from '../models/appointmentModel.js'

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // validating empty blocks
        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing details" })
        }

        // validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" })
        }

        // validating password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user data
const getProfile = async (req, res) => {
    try {

        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update profile data
const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing!" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            // uploading image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }

        res.json({success:true,message:"Profile Updated!"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment
const bookAppointment = async (req,res) => {
    try {
        
        const {userId, empId, slotDate, slotTime} = req.body

        const empData = await empModel.findById(empId).select('-password')

        if (!empData.available) {
            return res.json({success:false,message:"Employee not available"})
        }

        let slots_booked =  empData.slots_booked

        // checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:false,message:"Slot not available"})
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete empData.slots_booked

        const appointmentData = {
            userId,
            empId,
            userData,
            empData,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // saveing new slot data in empData
        await empModel.findByIdAndUpdate(empId,{slots_booked})

        res.json({success:true, message:"Appointment booked!"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get appointments from my-appointment page
const listAppointment = async (req,res) => {
    try {
        
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({success:true,appointments})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment
const cancelAppointment = async (req,res) => {
    try {
        
        const  {userId, appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // verifying appointment user
        if (appointmentData.userId !== userId) {
            return res.json({success:false, message:"Unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        // Making slot available
        const {empId, slotDate, slotTime} = appointmentData

        const empData = await empModel.findById(empId)

        let slots_booked = empData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await empModel.findByIdAndUpdate(empId, {slots_booked})

        res.json({success:true, message:"Appointment Cancelled!"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to reschedule appointment
const rescheduleAppointment = async (req, res) => {
    try {
        const { userId, appointmentId, newSlotDate, newSlotTime } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // Verifying appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" })
        }

        // Making old slot available
        const { empId, slotDate: oldSlotDate, slotTime: oldSlotTime } = appointmentData
        const empData = await empModel.findById(empId)
        let slots_booked = empData.slots_booked
        slots_booked[oldSlotDate] = slots_booked[oldSlotDate].filter(e => e !== oldSlotTime)

        // Booking new slot
        if (slots_booked[newSlotDate]) {
            if (slots_booked[newSlotDate].includes(newSlotTime)) {
                return res.json({ success: false, message: "New slot not available" })
            } else {
                slots_booked[newSlotDate].push(newSlotTime)
            }
        } else {
            slots_booked[newSlotDate] = [newSlotTime]
        }

        // Updating appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { slotDate: newSlotDate, slotTime: newSlotTime })

        // Updating employee slots
        await empModel.findByIdAndUpdate(empId, { slots_booked })

        res.json({ success: true, message: "Appointment rescheduled successfully!" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, rescheduleAppointment }