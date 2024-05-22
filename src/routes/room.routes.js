'use strict';

import { Router } from 'express';
import {
  getRooms,
  newRoom,
  updateRoom,
  viewRooms,
  deleteRoom,
} from '../controllers/room.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = Router();

api.get('/get', getRooms);
api.post('/new', [validateJwt, isAdmin], newRoom);
api.put('/update/:id', [validateJwt, isAdmin], updateRoom);
api.get('/get/:id/:idRoom', [validateJwt], viewRooms);
api.delete('/delete/:id', [validateJwt, isAdmin], deleteRoom);

export default api;
