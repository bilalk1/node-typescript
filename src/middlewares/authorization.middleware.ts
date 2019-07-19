
import { Request, Response, NextFunction } from 'express';
import helpers from '../helpers/defaultMessages';


const superAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { email, scope } = req.body;
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