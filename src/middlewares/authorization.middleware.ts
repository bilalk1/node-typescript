

export interface genericPayload {
    payload: IUser,

}
import { Request, Response, NextFunction } from 'express'
let messages = require("../helpers/defaultMessages");
import mongoose from 'mongoose';
import { IUser } from '../models/user.model';
import { ICard } from '../models/card.model';
const User = mongoose.model('User');
const admin = async (req: Request & genericPayload, res: Response, next: NextFunction) => {
    try {
        let payload = req.payload;
        if (!payload.email || !payload.scope) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        if (payload.scope === 'admin' || payload.scope === 'superAdmin') {
            next()
        } else {
            return res.status(401).json({ message: messages.account.unAuthorized });
        }

    } catch (error) {
        return res.status(401).json({ message: messages.account.unAuthorized });
    }
};

const superAdmin = async (req: Request & genericPayload, res: Response, next: NextFunction) => {
    try {
        let { email, scope } = req.payload;
        if (!email || !scope) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        if (scope === 'superAdmin') {
            next()
        } else {
            return res.status(401).json({ message: messages.account.unAuthorized });
        }
    } catch (error) {
        return res.status(401).json({ message: messages.account.unAuthorized });
    }
};
module.exports = {
    admin,
    superAdmin
}