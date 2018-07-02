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
const constants = require('./constants');
function initializePagination(req) {
    const page = req.query.page || 1,
        userLimit = parseInt(req.query.limit) || constants.PAGINATE.LIMIT,
        limit = userLimit > constants.PAGINATE.MAX_LIMIT ? constants.PAGINATE.LIMIT : userLimit;
    return {
        page,
        limit,
    }
}
module.exports = {
    initializePagination
}