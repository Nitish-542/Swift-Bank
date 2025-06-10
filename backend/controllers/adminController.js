import validator from "validator"
import bcrypt from 'bcryptjs';
import { v2 as cloudinary} from "cloudinary"
import empModel from "../models/empModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"

// api for adding employee
const addEmp = async (req,res) => {
    try {
        const { name, email, password, speciality, position, degree, experience, about, address } = req.body
        const imageFile = req.file

        // checking for all data to add an employee
        if (!name || !email || !password || !speciality || !position || !degree || !experience || !about || !address) {
            return res.json({success:false, message:"Missing Details"})
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hashing employee password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // uploading image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const empData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            position,
            degree,
            experience,
            about,
            address:JSON.parse(address),
            date:Date.now()
        }
        const newEmp = new empModel(empData)
        await newEmp.save()

        res.json({success:true, message: "Employee added"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API for admin login
const loginAdmin = async (req,res) => {
    try {
        const {email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else {
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to get all employees for admin panel
const allEmps = async (req,res) => {
    try {
        const employees = await empModel.find({}).select('-password')
        res.json({success:true, employees})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to get appointment list
const appointmentsAdmin = async (req,res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to cancel appointments(admin side)
const appointmentCancel = async (req,res) => {
    try {
        
        const  { appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

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

// API to get dashboard data for admin
const adminDashboard = async (req,res) => {
    try {

        const employees = await empModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            employees: employees.length,
            appointments: appointments.length,
            clients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
            
        res.json({success:true, dashData})
        
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {addEmp, loginAdmin, allEmps, appointmentsAdmin, appointmentCancel, adminDashboard}