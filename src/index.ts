import express, {Request, Response} from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import markerRoutes from './routes/markerRoutes'

mongoose.connect(process.env.MONGODB_CONNNECTION_STRING as string)


const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.get("/health", async(req: Request, res: Response) => {
    res.send({ message: "Looking good baby"})
})


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/markers", markerRoutes)

app.listen(7000, () => {
    console.log("server is running on localhost 7000");
    
})