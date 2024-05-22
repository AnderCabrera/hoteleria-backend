'use strict';

import { Schema, model } from 'mongoose';

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email already exists'],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    // el id del hotel solo se asigna si el usuario es admin_hotel
    id_hotel: {
      type: Schema.ObjectId,
      ref: 'Hotel',
      required: false,
    },
    role: {
      type: String,
      uppercase: true,
      enum: ['CLIENT', 'ADMIN_HOTEL', 'ADMIN_APP'],
      required: true,
    },
    tp_status: {
      type: String,
      uppercase: true,
      enum: ['ACTIVE', 'DELETED', 'BANNED'],
      required: true,
    },
  },
  {
    versionkey: false,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default model('User', userSchema);
