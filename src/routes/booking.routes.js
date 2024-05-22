'use strict';

import { Router } from 'express';
import { validateJwt } from '../middlewares/validate-jwt.js';
import {
  newBooking,
  getDates,
  getBookings,
} from '../controllers/booking.controller.js';

const api = Router();

api.get('/bookings', [validateJwt], getBookings);
api.get(
  '/dates/:idRoom',
  [
    /* validateJwt */
  ],
  getDates,
);
api.post('/new/:idRoom/:idUser', [validateJwt], newBooking);

export default api;
