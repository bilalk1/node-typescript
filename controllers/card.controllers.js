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





// url:https://api.sparkpost.com/api/v1/transmissions
// method: post
// headers:
// Content-Type: application/json
// Authorization:3e5d1a2d91cbc4e652f607483d85c178ec2cac29
// Payload: {"content": {"from": {"name": "G+D Canvas", "email": "poc@gnd-canvas.ca"}, "subject": "POC from G+D", "html": "%THE BODY OF YOUR EMAIL%"}, "recipients": [{ "address": "%RECIPIENT%" }]}
//  


const mongoose = require('mongoose');
const Card = mongoose.model('Card');
const messages = require('../helpers/index').messages;
const sparkPostEmail = require('../helpers/sparkPostEmail');
const utility = require('../helpers/utilityFunctions');

const postCard = async (req, res) => {
    try {
        let { email, cardHolderName, cardLastFourDigits } = req.body;

        if (!email || !cardHolderName || !cardLastFourDigits) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let otp = utility.generateOTP();
        req.body['otp'] = otp;

        let card = new Card(req.body);
        card = await card.save();

        let sha = utility.SHA256(card);
        let qrCode = await utility.generateQrCode(sha);

        // res.send(card); we can make email sending process as background process;
        // await sparkPostEmail.sendEmail(otp, email);
        card['qrCode'] = qrCode;
        await card.updateOne(card);
        return res.status(200).json({ messages: messages.generic.update });





    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: messages.generic.dataAlreadyExists });
        }
        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}

const getCards = async (req, res) => {
    try {
        let pagination = utility.initializePagination(req);
        let where;
        let [cards, total] = await Promise.all([
            Card
                .find({ where: where })
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .select('cardLastFourDigits cardHolderName expiryDate cvv email  qrCode status')
                .lean()
                .exec(),
            Card
                .count()
        ]);
        res.status(200).json({
            limit: pagination.limit,
            total,
            page: pagination.page,
            totalPages: Math.ceil(total / pagination.limit),
            cards
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
module.exports = {
    postCard,
    getCards
}