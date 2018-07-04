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
let category = require('./category.controller');
let country = require('./country.controllers');
let city = require('./city.controllers');
let store = require('./store.controllers');
module.exports = {
    category,
    country,
    store,
    city
}