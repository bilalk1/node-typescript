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
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    isValid: {
        type: Boolean,
        default: true
    }
});
schema.plugin(timestamp);
mongoose.model('User', schema);