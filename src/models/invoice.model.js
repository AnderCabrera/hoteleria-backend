'use strict';

import { Schema, model } from 'mongoose';

const invoiceSchema = Schema(
  {
    id_transaction: {
      type: Schema.ObjectId,
      ref: 'servicesAdquired',
      required: true,
    },
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
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
    versionkey: false,
  },
);

export default model('invoice', invoiceSchema);
