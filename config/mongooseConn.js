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
let config = require('./config.json');
let dburl = config.db.host;

mongoose.connect(dburl);
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function (error) {
    console.log(" Mongoose connected error " + error);
});
mongoose.connection.on('disconnected', function () {
    console.log(" Mongoose disconnected ");
});