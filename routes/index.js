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
router.use(require('./category.routes'));
router.use(require('./country.routes'));
router.use(require('./city.routes'));

module.exports = router;