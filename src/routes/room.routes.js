'use strict';

import { Router } from 'express';
import {
  newRoom,
  updateRoom,
  viewRooms,
  deleteRoom,
} from '../controllers/room.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/new', [validateJwt, isAdmin], newRoom);
api.put('/update:id', [validateJwt, isAdmin], updateRoom);
api.get('/get', [validateJwt], viewRooms);
api.delete('/delete', [validateJwt, isAdmin], deleteRoom);

export default api;
