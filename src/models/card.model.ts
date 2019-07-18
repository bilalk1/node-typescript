
import mongoose, { Schema } from 'mongoose';
import { ICard } from '../interfaces/card';

const schema: Schema = new Schema({
    cardLastFourDigits: {
        type: String,
    },
    cardHolderName: {
        type: String
    },
    expiryDate: {
        type: String
    },
    cvv: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String
    },
    qrCode: {
        type: String
    },
    qrCodeInformation: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    pin: {
        type: String
    }
}, { versionKey: false });
export default mongoose.model<ICard>('Card ', schema);