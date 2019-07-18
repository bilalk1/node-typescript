
import { Request, Response, NextFunction } from 'express';
import helpers from '../helpers/defaultMessages';


//any will  be replaced by proper Request 
const superAdmin = async (req: any, res: Response, next: NextFunction) => {
    try {
        let { email, scope } = req.payload;
        if (!email || !scope) {
            return res.status(400).json({ message: helpers.generic.requiredFieldsMissing });
        }
        if (scope === 'superAdmin') {
            next()
        } else {
            return res.status(401).json({ message: helpers.account.unAuthorized });
        }
    } catch (error) {
        return res.status(401).json({ message: helpers.account.unAuthorized });
    }
};
export = {
    superAdmin
}