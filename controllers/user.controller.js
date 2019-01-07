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
const passwordEncryption = require('../helpers/index').password;
const { config } = require('../config/config');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { createToken } = require('../helpers/token');

const signIn = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let user = await User.findOne({ email: { $eq: email } });
        let p = await passwordEncryption.encryptPassword(password, user.salt);
        if (user.email !== email || user.password !== p) {
            return res.status(400).json({ message: messages.user.inValid });
        }
        return res.status(200).json({ adminData: { token: createToken(user), scope: user.type } });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
const signUp = async (req, res) => {
    try {
        let { email, password, type } = req.body;
        if (!email || !password || !type) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let salt = await passwordEncryption.salt();
        req.body.salt = salt;
        req.body.password = await passwordEncryption.encryptPassword(password, salt)
        let user = new User(req.body);
        user = await user.save();
        return res.status(200).json({ messages: messages.account.signUp });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    signIn,
    signUp
}