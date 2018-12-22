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

const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const schema = new mongoose.Schema({
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
        unique: true
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
    }
}, { versionKey: false });
schema.plugin(timestamp);
mongoose.model('Card', schema);