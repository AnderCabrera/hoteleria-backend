'use strict';

import { Router } from 'express';
import {
  newUser,
  newAdmin,
  login,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/newUser', newUser);
api.post('/newAdmin', newAdmin);
api.post('/login', login);
api.put('/update', [validateJwt], updateUser);
api.get('/delete', [validateJwt], deleteUser);

export default api;
