'use strict';

import { Router } from 'express';
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js';
import {
  newService,
  viewServices,
  deleteService,
} from '../controllers/service.controller.js';

const api = Router();

api.post('/new', [validateJwt, isAdmin], newService);
api.get('/view/:idHotel', [validateJwt], viewServices);
api.put('/delete/:idService', [validateJwt, isAdmin], deleteService);

export default api;
