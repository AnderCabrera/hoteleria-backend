'use strict'

import { Schema, model } from 'mongoose'

const userSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['CLIENT','ADMIN'],
        required: true
    },
    tp_status: {
        type: String,
        uppercase: true,
        enum: ['ACTIVE','DELETED','BANNED'],
        required: true
    }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionkey: false
})

export default model('user', userSchema)