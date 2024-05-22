'use strict';

import { Schema, model } from 'mongoose';

const roomSchema = Schema(
  {
    description: {
      type: String,
      required: true,
    },
    peopleCapacity: {
      type: Number,
      required: true,
    },
    nightPrice: {
      type: Number,
      required: true,
    },
    roomType: {
      type: Schema.ObjectId,
      ref: 'typeRoom',
      required: true,
    },
    tp_status: {
      type: String,
      uppercase: true,
      enum: ['ACTIVE', 'DELETED', 'HIDDEN'],
      default: 'ACTIVE',
      required: false,
    },
    idHotel: {
      type: Schema.ObjectId,
      ref: 'hotel',
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

export default model('room', roomSchema);
