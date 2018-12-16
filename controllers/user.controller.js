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
const messages = require('../helpers/index').messages;
const { config } = require('../config/config');
const postUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        if (config.development.credentials.email !== email || config.development.credentials.password !== password) {
            return res.status(400).json({ message: messages.user.inValid });
        }
        return res.status(200).json({ message: messages.user.valid });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
module.exports = {
    postUser,
}