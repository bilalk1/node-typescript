// /**********************************************************************
//  * Copyright (c) 2018 PK Flyers , all rights reserved
//  * Proprietary and Confidential Information
//  *
//  * This source file is the property of PK Flyers, and
//  * may not be copied or distributed in any isomorphic form without
//  * the prior written consent of PK Flyers.
//  *
//  *
//  * Author: Bilal Iftikhar

//  */

const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    isValid: {
        type: Boolean,
        default: true
    }

});
schema.plugin(timestamp);
mongoose.model('Category', schema);