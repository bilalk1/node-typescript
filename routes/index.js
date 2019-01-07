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
const express = require('express');
const router = express.Router();
const mdw = require('../middlewares');



let authorized = require('./authorized');
let ununauthorized = require('./unauthorized')
router.use(function (req, res, next) {
    if (req.method == "OPTIONS") {
        res.send(200);
    } else {
        next();
    }
});
router.use(ununauthorized, mdw.basicAuthentication, authorized);

module.exports = router;