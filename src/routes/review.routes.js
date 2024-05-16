'use strict';

import { Router } from 'express';
import {
  newReview,
  editReview,
  deleteReview,
  viewReviews,
} from '../controllers/review.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/new', [validateJwt], newReview);
api.put('/update/:id', [validateJwt], editReview);
api.get('/get', [validateJwt], viewReviews);
api.delete('/delete/:id', [validateJwt], deleteReview);

export default api;
