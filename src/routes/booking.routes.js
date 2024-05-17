'use strict';

import { Router } from 'express';
import { validateJwt } from '../middlewares/validate-jwt.js';
import { newBooking, getDates } from '../controllers/booking.controller.js';

const api = Router();

api.post('/new/:idRoom/:idUser', [validateJwt], newBooking);
api.get('/dates/:idRoom', [validateJwt], getDates);

export default api;
