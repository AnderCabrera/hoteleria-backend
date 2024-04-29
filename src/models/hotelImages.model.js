'use strict';

import { Schema, model } from 'mongoose';

const hotelImagesSchema = Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
    hotel_id: {
      type: Schema.ObjectId,
      ref: 'hotel',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model('hotelImages', hotelImagesSchema);
