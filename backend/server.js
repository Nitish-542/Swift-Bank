import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import empRouter from './routes/empRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000

// connect to MongoDB and Cloudinary
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/employee', empRouter)
app.use('/api/user', userRouter)

// test route for checking API
app.get('/', (req, res) => {
    res.send('api working')
})

// ✅ new route to verify backend is running
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working fine' })
})

// start server
app.listen(port, () => console.log(`Server started at http://localhost:${port}`))
