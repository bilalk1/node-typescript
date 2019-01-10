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
let controller = require('../../controllers').user;
const auth = require('../../middlewares').authorization;

router
    .post('/', auth.superAdmin, controller.postUser)
    .get('/', auth.admin, controller.getUser)
    .delete('/:id', auth.superAdmin, controller.deleteUser)

module.exports = router;