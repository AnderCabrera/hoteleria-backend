import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import { config } from 'dotenv'
import userRoutes from '../routes/user.routes.js'
import hotelRoutes from '../routes/hotel.routes.js'
import favoriteHotelRoutes from '../routes/favoriteHotels.routes.js'
import typeRoomRoutes from '../routes/typeRoom.routes.js'
import roomRoutes from '../routes/room.routes.js'

const app = express()
config()
const port = process.env.PORT || 3200

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Rutas hacia los controladores
app.use('/user', userRoutes)
app.use('/hotel', hotelRoutes)
app.use('/favoriteHotel', favoriteHotelRoutes)
app.use('/typeRoom', typeRoomRoutes)
app.use('/room', roomRoutes)

export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}