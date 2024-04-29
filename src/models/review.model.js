'use strict';

import { Schema, model } from 'mongoose';

const reviewSchema = Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    is_customer: {
      type: Boolean,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel_id: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model('review', reviewSchema);
