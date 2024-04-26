'use strict'

import { Schema, model } from 'mongoose'

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    versionkey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

export default model('user', userSchema)