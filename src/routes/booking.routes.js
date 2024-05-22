'use strict';

import { Router } from 'express';
import { validateJwt } from '../middlewares/validate-jwt.js';
import {
  newBooking,
  getDates,
  getBooking,
  getBookings,
} from '../controllers/booking.controller.js';

const api = Router();

api.get('/bookings', [validateJwt], getBookings);
api.post('/new/:idRoom/:idUser', [validateJwt], newBooking);
api.get('/dates/:idRoom', [validateJwt], getDates);
api.get('/getBooking', [validateJwt], getBooking);

export default api;
