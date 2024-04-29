'use strict';

import { Router } from 'express';
import {
  newTypeRoom,
  updateTypeRoom,
  viewTypeRoom,
  searchTypeRoomById,
  searchTypeRoomByName,
  deleteTypeRoom,
} from '../controllers/typeRoom.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/new', [validateJwt, isAdmin], newTypeRoom);
api.put('/update:id', [validateJwt, isAdmin], updateTypeRoom);
api.get('view', [validateJwt], viewTypeRoom);
api.get('searchId:id', [validateJwt], searchTypeRoomById);
api.post('/searchName', [validateJwt], searchTypeRoomByName);
api.delete('/delete:id', [validateJwt, isAdmin], deleteTypeRoom);

export default api;
