'use strict';

import { Schema, model } from 'mongoose';

const typeRoomSchema = Schema(
  {
    name: {
      type: Schema,
      required: true,
    }
  },
  {
    versionKey: false,
  }
);

export default model('typeRoom', typeRoomSchema);
