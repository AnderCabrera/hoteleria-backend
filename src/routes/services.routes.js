'use strict';

import { Router } from 'express';
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js';
import {
  newService,
  viewServices,
  deleteService,
} from '../controllers/services.controller.js';

const api = Router();

api.post('/new', [validateJwt, isAdmin], newService);
api.get('/view', [validateJwt], viewServices);
api.put('/delete/:idService', [validateJwt, isAdmin], deleteService);

export default api;
