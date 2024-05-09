'use strict';

import { Schema, model } from 'mongoose';

const bookingSchema = Schema(
  {
    date_start: {
      type: Date,
      required: true,
    },
    date_end: {
      type: Date,
      required: true,
    },
    room: {
      type: Schema.ObjectId,
      ref: 'room',
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
      updatedAt: 'updated_at',
    },
    versionkey: false,
  },
);

export default model('Booking', bookingSchema);
