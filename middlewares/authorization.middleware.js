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
let messages = require("../helpers/defaultMessages");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const admin = async (req, res, next) => {
    try {
        let { email, scope } = req.payload;
        if (!email || !scope) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        if (scope === 'admin' || scope === 'superAdmin') {
            next()
        } else {
            return res.status(401).json({ message: messages.account.unAuthorized });
        }

    } catch (error) {
        return res.status(401).json({ message: messages.account.unAuthorized });
    }
};

const superAdmin = async (req, res, next) => {
    try {
        let { email, scope } = req.payload;
        if (!email || !scope) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        if (scope === 'superAdmin') {
            next()
        } else {
            return res.status(401).json({ message: messages.account.unAuthorized });
        }
    } catch (error) {
        return res.status(401).json({ message: messages.account.unAuthorized });
    }
};
module.exports = {
    admin,
    superAdmin
}