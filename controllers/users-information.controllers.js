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

const mongoose = require('mongoose');
const UserInformation = mongoose.model('UserInformation');
const messages = require('../helpers/index').messages;
const sparkPostEmail = require('../helpers/sparkPostEmail');
const utility = require('../helpers/utilityFunctions');

const postUserInformation = async (req, res) => {
    try {
        let { email, cardHolderName, cardLastFourDigits } = req.body;

        if (!email || !cardHolderName || !cardLastFourDigits) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let otp = utility.generateOTP();
        req.body['otp'] = otp;

        let userInformation = new UserInformation(req.body);
        userInformation = await userInformation.save();

        let qrCodeInformation = utility.SHA256(userInformation);
        let qrCode = await utility.generateQrCode(qrCodeInformation);

        // res.send(userInformation); we can make email sending process as background process;
        await sparkPostEmail.sendEmail(otp, email);
        userInformation['qrCode'] = qrCode;
        userInformation['qrCodeInformation'] = qrCodeInformation;
        await userInformation.updateOne(userInformation);
        return res.status(200).json({ messages: messages.generic.update });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: messages.generic.dataAlreadyExists });
        }
        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}

const getUserInformation = async (req, res) => {
    try {
        let pagination = utility.initializePagination(req);
        let where;
        let [userInformation, total] = await Promise.all([
            UserInformation
                .find({ where: where })
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .select('cardLastFourDigits cardHolderName expiryDate cvv email  qrCode status')
                .lean()
                .exec(),
            UserInformation
                .count()
        ]);
        res.status(200).json({
            limit: pagination.limit,
            total,
            page: pagination.page,
            totalPages: Math.ceil(total / pagination.limit),
            userInformation
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const postUserInformationStatus = async (req, res) => {
    try {
        let { qrCode, otp } = req.body;
        if (!qrCode || !otp) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let query = {
            $and: [
                { otp: { $eq: otp } },
                { qrCodeInformation: { $eq: qrCode } }
            ]
        }
        let userInformation = await UserInformation.find(query);
        if (userInformation.length > 0) {
            await UserInformation.updateOne(query, { status: true });
            return res.status(200).json({ messages: messages.user.active });
        }
        return res.status(400).json({ messages: messages.user.notFound });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

module.exports = {
    postUserInformation,
    getUserInformation,
    postUserInformationStatus
}