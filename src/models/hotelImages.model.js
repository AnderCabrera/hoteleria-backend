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
      ref: 'Hotel',
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model('HotelImages', hotelImagesSchema);
