'use strict';

import { Router } from 'express';
import { validateJwt } from '../middlewares/validate-jwt.js';
import { newInvoice } from '../controllers/invoice.controller.js';

const api = Router();

api.post('/new/:idRoom/:idUser/:price', [validateJwt], newInvoice);

export default api;
