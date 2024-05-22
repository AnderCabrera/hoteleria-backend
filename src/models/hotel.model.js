'use strict';

import { Schema, model } from 'mongoose';

const hotelSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
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
      enum: ['ACTIVE', 'DELETED', 'BANNED'],
      required: false,
      default: 'ACTIVE',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionkey: false,
  },
);

export default model('Hotel', hotelSchema);
