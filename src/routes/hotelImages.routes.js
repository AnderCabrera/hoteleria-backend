'use strict';

import { Router } from 'express';
import {
  addImageHotel,
  deleteImageHotel,
  deleteImagesHotel,
} from '../controllers/hotelImages.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/new', [validateJwt, isAdmin], addImageHotel);
api.delete('/delete:id', [validateJwt, isAdmin], deleteImageHotel);
api.delete('/deleteAll:id', [validateJwt, isAdmin], deleteImagesHotel);

export default api;
