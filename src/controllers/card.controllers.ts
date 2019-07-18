

import { Request, Response } from 'express';
import CardModel from '../models/card.model';
import { ICard } from '../interfaces/card';
import helpers from '../helpers';

const postCard = async (req: Request, res: Response) => {
    try {
        let card: ICard;
        card = req.body;
        if (!card.email || !card.cardHolderName || !card.cardLastFourDigits) {
            return res.status(400).json({ message: helpers.messages.generic.requiredFieldsMissing });
        }
        card.otp = helpers.utility.generateOTP();
        let cardModel = new CardModel();
        cardModel = await cardModel.save();
        card.qrCodeInformation = helpers.utility.SHA256(card);
        card.qrCode = await helpers.utility.generateQrCode(card.qrCodeInformation);
        await helpers.sparkPost.sendEmail(card.cardHolderName, card.otp, card.email);
        await cardModel.updateOne(card);
        return res.status(200).json({ messages: helpers.messages.generic.update });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: helpers.messages.generic.dataAlreadyExists });
        }
        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}

export = {
    postCard
}
