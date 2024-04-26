'use strict'

import { Schema, model } from "mongoose"

const favoriteHotelsSchema = Schema({
    user_id: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    hotel_id: {
        type: Schema.ObjectId,
        ref: 'hotel',
        required: true
    }
},
{
    versionkey: false
})

export default model('favoriteHotels', favoriteHotelsSchema)