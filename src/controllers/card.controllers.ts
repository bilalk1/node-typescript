

import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ICard } from '../models/card.model';

const CardModel = mongoose.model('Card');
const messages = require('../helpers/index').messages;
const sparkPostEmail = require('../helpers/sparkPostEmail');
const utility = require('../helpers/utilityFunctions');



const postCard = async (req: Request, res: Response) => {
    try {
        let card: ICard;
        card = req.body;

        if (!card.email || !card.cardHolderName || !card.cardLastFourDigits) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        card.otp = utility.generateOTP();

        let cardModel = new CardModel();
        cardModel = await cardModel.save();

        card.qrCodeInformation = utility.SHA256(card);
        card.qrCode = await utility.generateQrCode(card.qrCodeInformation);

        // res.send(card); we can make email sending process as background process;
        await sparkPostEmail.sendEmail(card.cardHolderName, card.otp, card.email);
        await cardModel.updateOne(card);
        return res.status(200).json({ messages: messages.generic.update });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: messages.generic.dataAlreadyExists });
        }
        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}

export = {
    postCard
}
