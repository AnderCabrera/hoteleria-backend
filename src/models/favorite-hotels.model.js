'use strict';

import { Schema, model } from 'mongoose';

const favoriteHotelsSchema = Schema(
  {
    user_id: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel_id: {
      type: Schema.ObjectId,
      ref: 'Hotel',
      required: true,
    },
  },
  {
    versionkey: false,
  },
);

export default model('FavoriteHotels', favoriteHotelsSchema);
