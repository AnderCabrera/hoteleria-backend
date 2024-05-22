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
    servicesAdquired: {
      type: [
        {
          type: Schema.ObjectId,
          ref: 'Service',
        },
      ],
      required: true,
    },
    room: {
      type: Schema.ObjectId,
      ref: 'Room',
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
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
