'use strict';

import { Router } from 'express';
import {
  newUser,
  newAdmin,
  login,
  updateUser,
  deleteUser,
  dataUser,
} from '../controllers/user.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/newUser', newUser);
api.post('/newAdmin', newAdmin);
api.post('/login', login);
api.put('/update:id', [validateJwt], updateUser);
api.get('/delete:id', [validateJwt], deleteUser);
api.get('/search:id', [validateJwt], dataUser);

export default api;
