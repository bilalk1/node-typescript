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

require('./mongooseConn.js');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const routes = require('../routes');

module.exports = () => {
    let app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    if (process.env.NODE_ENV == "development") {
        app.use(morgan());
    }
    else {
        app.use(compression());
    }
    // CORS -> Cross Origin Resource Sharing 
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept-Encoding, Accept-Language');
        next();
    });
    app.use(morgan("dev"));
    app.get('/', (req, res) => res.status(200).json({
        message: " App is working "
    }));
    app.use(routes);
    return app;
}
