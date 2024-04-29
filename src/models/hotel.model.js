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
