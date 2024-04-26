'use strict'

import { Router } from 'express'
import { newHotel } from '../controllers/hotel.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/newHotel', newHotel)

export default api