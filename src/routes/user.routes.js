'use strict'

import { Router } from 'express'
import { newUser, newAdmin, login } from '../controllers/user.controller.js'
const api = Router()

api.post('/newUser', newUser)
api.post('/newAdmin', newAdmin)
api.post('/login', login)

export default api