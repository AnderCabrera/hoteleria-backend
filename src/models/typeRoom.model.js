'use strict';

import { Schema, model } from 'mongoose';

const typeRoomSchema = Schema(
  {
    type: {
      type: Schema,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default model('typeRoom', typeRoomSchema);
