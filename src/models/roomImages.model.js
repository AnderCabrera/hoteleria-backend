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
      ref: 'room',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model('roomImages', roomImagesSchema);
