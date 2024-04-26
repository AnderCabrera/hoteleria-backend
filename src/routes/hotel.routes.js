'use strict'

import { Router } from 'express'
import { newHotel, updateHotel, deleteHotel, viewHotels } from '../controllers/hotel.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/newHotel', newHotel)
api.put('/update', updateHotel)
api.delete('/delete', deleteHotel)
api.get('/get', viewHotels)

export default api