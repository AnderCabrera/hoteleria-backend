'use strict';

import { Schema, model } from 'mongoose';

const roomImagesSchema = Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
    room_id: {
      type: Schema.ObjectId,
      ref: 'Room',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model('RoomImages', roomImagesSchema);
