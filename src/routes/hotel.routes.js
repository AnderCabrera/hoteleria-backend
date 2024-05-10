'use strict';

import { Router } from 'express';
import {
  newHotel,
  updateHotel,
  deleteHotel,
  viewHotels,
} from '../controllers/hotel.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/newHotel', [validateJwt, isAdmin], newHotel);
api.put('/update', [validateJwt, isAdmin], updateHotel);
api.delete('/delete', [validateJwt, isAdmin], deleteHotel);
api.get('/get', viewHotels);

export default api;
