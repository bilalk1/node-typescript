import { Document } from 'mongoose';
export interface ICard extends Document {
    cardLastFourDigits: string,
    qrCodeInformation: string,
    cardHolderName: string,
    expiryDate: string,
    status: string,
    qrCode: string,
    email: string,
    cvv: string,
    otp: string,
    pin: string,
    id: string
}