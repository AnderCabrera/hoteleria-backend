'use strict';

import { Router } from 'express';
import {
  getRooms,
  newRoom,
  updateRoom,
  viewRooms,
  deleteRoom,
  viewRoomsHotel,
} from '../controllers/room.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = Router();

api.get('/get', getRooms);
api.post('/new/:idUser', /*[validateJwt, isAdmin],*/ newRoom);
api.put('/update/:id', [validateJwt, isAdmin], updateRoom);
api.get('/get/:id/:idRoom', [validateJwt], viewRooms);
api.delete('/delete/:id', [validateJwt, isAdmin], deleteRoom);
api.get('/getHotel/:idUser', [validateJwt], viewRoomsHotel);

export default api;
