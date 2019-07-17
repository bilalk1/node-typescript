

import mongoose, { Schema, Document } from 'mongoose';
const timestamp = require('mongoose-timestamp');

const schema: Schema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    isValid: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
    }
});
schema.plugin(timestamp);

export interface IUser extends Document {
    isValid: boolean,
    password: string,
    email: string,
    salt: string,
    type: string,
    scope: string
}

export default mongoose.model<IUser>('User', schema);