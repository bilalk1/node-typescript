

import mongoose from 'mongoose';
import { Request, Response } from 'express';
const CardModel = mongoose.model('Card');
const messages = require('../helpers/index').messages;
const sparkPostEmail = require('../helpers/sparkPostEmail');
const utility = require('../helpers/utilityFunctions');
interface Card {
    cardLastFourDigits: string,
    qrCodeInformation: string,
    cardHolderName: string,
    expiryDate: string,
    status: string,
    qrCode: string,
    email: String,
    cvv: string,
    otp: string,
    pin: string
}
const postCard = async (req: Request, res: Response) => {
    try {
        let card: Card;
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
// const countCard = async (req: Request: Req: Responseuest, res: Response) => {
//     try {
//         let [valid, inValid, total] = await Promise.all([
//             Card
//                 .find({ status: true })
//                 .countDocuments(),
//             Card
//                 .find({ status: false })
//                 .countDocuments(),
//             Card
//                 .countDocuments()
//         ]);
//         res.status(200).json({
//             valid,
//             inValid,
//             total
//         });

//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// }
// const getCard = async (req: Request, res: Response) => {
//     try {

//         let pagination = utility.initializePagination(req);
//         let where;
//         let [card, total] = await Promise.all([
//             Card
//                 .find({ where: where })
//                 .skip((pagination.page - 1) * pagination.limit)
//                 .limit(pagination.limit)
//                 .select('cardLastFourDigits cardHolderName expiryDate cvv email  qrCode status pin')
//                 .lean()
//                 .exec(),
//             Card
//                 .countDocuments()
//         ]);
//         res.status(200).json({
//             limit: pagination.limit,
//             total,
//             page: pagination.page,
//             totalPages: Math.ceil(total / pagination.limit),
//             card
//         });

//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// }

// const postCardStatus = async (req: Request, res: Response) => {
//     try {
//         let { qrCode, otp } = req.body;
//         if (!qrCode || !otp) {
//             return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
//         }
//         let query = {
//             $and: [
//                 { otp: { $eq: otp } },
//                 { qrCodeInformation: { $eq: qrCode } }
//             ]
//         }

//         let card = await Card.findOne(query);

//         if (!card) return res.status(400).json({ messages: messages.user.notFound });

//         await card.updateOne({ status: true });
//         return res.status(200).json({
//             messages: messages.user.active,
//             name: card.cardHolderName,
//             lastFourDigits: card.cardLastFourDigits,
//         });
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }

// }
// const getCardStatus = async (req: Request, res: Response) => {
//     try {
//         let { qrCode } = req.query;
//         if (!qrCode) {
//             return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
//         }
//         let query = {
//             qrCodeInformation: { $eq: qrCode }
//         };
//         let card = await Card.findOne(query);
//         if (!card) return res.status(400).json({ messages: messages.user.notFound });
//         return res.status(200).json({ status: card.status });
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }

// }

// const updateCard = async (req: Request, res: Response) => {
//     try {
//         let { _id, email, cardHolderName, cardLastFourDigits } = req.body;
//         if (!_id || !email || !cardHolderName || !cardLastFourDigits) {
//             return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
//         }
//         let card = await Card.findOne({ _id: _id });
//         req.body.otp = card.otp;
//         let qrCodeInformation = utility.SHA256(req.body);
//         let qrCode = await utility.generateQrCode(qrCodeInformation);
//         req.body.qrCode = qrCode;
//         req.body.qrCodeInformation = qrCodeInformation;
//         await card.updateOne(req.body);
//         return res.status(200).json({ message: messages.user.update });

//     } catch (err) {

//         return res.status(500).json({ message: err.message });
//     }

// }

// const sendOtp = async (req: Request, res: Response) => {
//     try {
//         let { id, email } = req.body;
//         if (!id || !email) {
//             return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
//         }
//         let card = await Card.findOne({ _id: id });
//         await sparkPostEmail.sendEmail(card.cardHolderName, card.otp, email);
//         return res.status(200).json({ message: messages.user.sendOtp });

//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }
// const updateCardStatus = async (req: Request, res: Response) => {
//     try {
//         let { id, status } = req.body;
//         if (!id) {
//             return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
//         }
//         await Card.updateOne({ _id: id }, { status: status });
//         return res.status(200).json({ message: messages.user.statusUpdated });

//     }
//     catch (error) {
//         return res.status(500).json({ message: error.message });

//     }
// }
// const deleteCard = async (req: Request, res: Response) => {
//     try {
//         let { id } = req.params;
//         if (!id) return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
//         await Card.deleteOne({ _id: id });
//         return res.status(200).json({ message: messages.generic.removed });
//     }
//     catch (error) {
//         return res.status(500).json({ message: error.message });

//     }
// }
// const postCardPin = async (req: Request, res: Response) => {
//     try {
//         let { qrCode, pin } = req.body;
//         if (!qrCode || !pin) {
//             return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
//         }
//         let query = { qrCodeInformation: { $eq: qrCode } };

//         let card = await Card.findOne(query);

//         if (!card) return res.status(400).json({ messages: messages.user.notFound });
//         await card.updateOne({ pin: pin });
//         return res.status(200).json({ message: messages.generic.update });
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }

// }
// module.exports = {
//     postCard,
//     getCard,
//     postCardStatus,
//     updateCard,
//     sendOtp,
//     updateCardStatus,
//     deleteCard,
//     getCardStatus,
//     postCardPin,
//     countCard
// }