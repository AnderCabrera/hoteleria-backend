'use strict'

import { Schema, model } from "mongoose"

const servicesAdquiredSchema = Schema({
    service: {
        type: Schema.ObjectId,
        ref: 'service',
        required: true
    },
    date_adquired: {
        type: Date,
        required: true
    },
    date_start: {
        type: Date,
        required: true
    },
    date_end: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
},
{
    versionKey: false
})

export default model('servicesAdquired', servicesAdquiredSchema)