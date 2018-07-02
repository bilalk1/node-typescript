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

const express = require('express');
const router = express.Router();
let controller = require('../controllers').country;

router
    .post('/country', controller.postCountry)
    .get('/countries', controller.getCountries)

module.exports = router;