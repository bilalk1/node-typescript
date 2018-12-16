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
let { config } = require('./config.js');
let dburl = config.development.db.host

mongoose.connect(dburl, { useNewUrlParser: true });
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function (error) {
    console.log(" Mongoose connected error " + error);
});
mongoose.connection.on('disconnected', function () {
    console.log(" Mongoose disconnected ");
});

require('../models');