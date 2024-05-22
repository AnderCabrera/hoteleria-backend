'use strict';

import { Router } from 'express';
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js';
import {
  getServices,
  newService,
  viewServices,
  deleteService,
} from '../controllers/service.controller.js';

const api = Router();

api.get('/get', [validateJwt], getServices);
api.post('/new', [validateJwt /*, isAdmin*/], newService);
api.get('/view/:idHotel', [validateJwt], viewServices);
api.put('/delete/:idService', [validateJwt, isAdmin], deleteService);

export default api;
