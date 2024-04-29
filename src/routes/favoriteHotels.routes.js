'use strict';

import { Router } from 'express';
import { validateJwt } from '../middlewares/validate-jwt.js';
import {
  newFavoriteHotel,
  viewFavoriteHotels,
  deleteFavoriteHotel,
} from '../controllers/favoriteHotels.controller.js';

const api = Router();

api.post('/new:id', [validateJwt], newFavoriteHotel);
api.get('/view', [validateJwt], viewFavoriteHotels);
api.delete('/delete:id', [validateJwt], deleteFavoriteHotel);

export default api;
