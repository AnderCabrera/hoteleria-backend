'use strict';

import { Schema, model } from 'mongoose';

const invoiceSchema = Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    booking_id: {
      type: Schema.ObjectId,
      ref: 'booking',
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: 'user',
      required: true,
    },
    services: [
      {
        type: Schema.ObjectId,
        ref: 'service',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
    versionkey: false,
  },
);

export default model('invoice', invoiceSchema);
