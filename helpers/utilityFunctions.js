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
    while (true) {
        let OTP = Math.random().toString(16).substring(2, 6).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
        let Exp = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
        if (OTP.match(Exp)) return OTP;
    }
}
function SHA256(card) {
    let id = card.id || card._id
    let key = sha256(id);
    key = sha256.hmac(key, card.otp)
    key = sha256.hmac(key, card.cardHolderName)
    key = sha256.hmac(key, card.cardLastFourDigits)
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