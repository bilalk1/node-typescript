import { ICard } from "../interfaces/card";
import constants from './constants';
import { sha256 } from 'js-sha256';
import { Request } from 'express';
import QRCode from 'qrcode';


function initializePagination(req: Request): Object {
    const page = req.query.page || 1,
        userLimit = parseInt(req.query.limit) || constants.PAGINATE.LIMIT,
        limit = userLimit > constants.PAGINATE.MAX_LIMIT ? constants.PAGINATE.LIMIT : userLimit;
    return {
        page,
        limit,
    }
}
function generateOTP(): string {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 8; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
function SHA256(card: ICard): string {
    let id: string = card.id;
    let key = sha256(id);
    key = sha256.hmac(key, card.otp)
    key = sha256.hmac(key, card.cardHolderName)
    key = sha256.hmac(key, card.cardLastFourDigits)
    return key;
}

const generateQrCode = function (body: string): Promise<string> {
    try {
        return new Promise<string>((resolve, reject) => {
            QRCode.toDataURL(body, function (err: Error, res: string) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        })

    } catch (err) {
        console.error(err);
        return err
    }
}
export = {
    initializePagination,
    generateOTP,
    generateQrCode,
    SHA256
}