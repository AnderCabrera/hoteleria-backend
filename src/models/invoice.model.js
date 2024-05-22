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
      ref: 'Booking',
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    services: [
      {
        type: Schema.ObjectId,
        ref: 'Service',
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

export default model('Invoice', invoiceSchema);
