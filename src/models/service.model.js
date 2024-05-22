'use strict';

import { Schema, model } from 'mongoose';

const serviceSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tp_status: {
      type: String,
      uppercase: true,
      enum: ['AVAILIABLE', 'DELETED', 'HIDDEN'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    hotelId: {
      type: Schema.ObjectId,
      ref: 'Hotel',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model('Service', serviceSchema);
