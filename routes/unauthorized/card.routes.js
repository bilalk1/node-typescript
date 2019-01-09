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
let controller = require('../../controllers').card;

router
    .post('/status', controller.postCardStatus) // Status Activate | Just Update Status of card to Activate True
    .get('/status', controller.getCardStatus)
    .post('/pin',controller.postCardPin)
module.exports = router;