'use strict';

import { Router } from 'express';
import {
  addImageRoom,
  deleteImageRoom,
  deleteImagesRoom,
  getImageRoom,
} from '../controllers/roomImages.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/new', [validateJwt, isAdmin], addImageRoom);
api.delete('/delete/:id', [validateJwt, isAdmin], deleteImageRoom);
api.delete('/deleteAll/:id', [validateJwt, isAdmin], deleteImagesRoom);
api.get('/get', getImageRoom);

export default api;
