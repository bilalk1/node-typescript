// /**********************************************************************
//  * Copyright (c) 2018 eActivate Manager , all rights reserved
//  * Proprietary and Confidential Information
//  *
//  * This source file is the property of eActivate Manager, and
//  * may not be copied or distributed in any isomorphic form without
//  * the prior written consent of eActivate Manager.
//  *
//  *
//  * Author: Bilal Iftikhar

//  */

import mongoose, { Schema, Document } from 'mongoose';
const timestamp = require('mongoose-timestamp');

export interface ICard extends Document {
    cardLastFourDigits: string,
    qrCodeInformation: string,
    cardHolderName: string,
    expiryDate: string,
    status: string,
    qrCode: string,
    email: String,
    cvv: string,
    otp: string,
    pin: string,
    id?: string
}

const schema: Schema = new Schema({
    cardLastFourDigits: {
        type: String,
    },
    cardHolderName: {
        type: String
    },
    expiryDate: {
        type: String
    },
    cvv: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String
    },
    qrCode: {
        type: String
    },
    qrCodeInformation: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    pin: {
        type: String
    }
}, { versionKey: false });
schema.plugin(timestamp);
export default mongoose.model<ICard >('Card ', schema);