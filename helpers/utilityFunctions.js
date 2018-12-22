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
const constants = require('./constants');
const QRCode = require('qrcode');
let { sha256 } = require('js-sha256');

function initializePagination(req) {
    const page = req.query.page || 1,
        userLimit = parseInt(req.query.limit) || constants.PAGINATE.LIMIT,
        limit = userLimit > constants.PAGINATE.MAX_LIMIT ? constants.PAGINATE.LIMIT : userLimit;
    return {
        page,
        limit,
    }
}
function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
function SHA256(userInformation) {
    let key = sha256(userInformation.id);
    key = sha256.hmac(key, userInformation.otp)
    key = sha256.hmac(key, userInformation.cardHolderName)
    key = sha256.hmac(key, userInformation.cardLastFourDigits)
    return key;
}

const generateQrCode = (body) => {
    try {
        return new Promise((resolve, reject) => {
            QRCode.toDataURL(body, function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        })

    } catch (err) {
        console.error(err)
    }
}
module.exports = {
    initializePagination,
    generateOTP,
    generateQrCode,
    SHA256
}