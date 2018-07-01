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
        type: String
    },
    isValid: {
        type: Boolean
    },
    lat: {
        type: String
    },
    lng: {
        type: String
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country"
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City"
    }
    
  

});
schema.plugin(timestamp);
mongoose.model('Store', schema);