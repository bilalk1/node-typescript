
const messages = require('../helpers/index').messages;
const passwordEncryption = require('../helpers/index').password;
import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
const utility = require('../helpers/utilityFunctions');
const { createToken } = require('../helpers/token');

const signIn = async (req: Request, res: Response) => {
    try {
        let user: IUser;
        user = req.body;
        if (!user.email || !user.password) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        // let UserModel = new User();
        await User.findOne({ email: { $eq: user.email } });
        let p = await passwordEncryption.encryptPassword(user.password, user.salt);
        // if (user.email !== email || user.password !== p) {
        //     return res.status(400).json({ message: messages.user.inValid });
        // }
        return res.status(200).json({ adminData: { token: createToken(user), scope: user.type } });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
const signUp = async (req: Request, res: Response) => {
    try {
        let { email, password, type } = req.body;
        if (!email || !password || !type) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let salt = await passwordEncryption.salt();
        req.body.salt = salt;
        req.body.password = await passwordEncryption.encryptPassword(password, salt)
        let user = new User(req.body);
        user = await user.save();
        return res.status(200).json({ messages: messages.account.signUp });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const getUser = async (req: Request, res: Response) => {
    try {
        let pagination = utility.initializePagination(req);
        let where;
        let [user, total] = await Promise.all([
            User
                .find({ where: where })
                .skip((pagination.page - 1) * pagination.limit)
                .limit(pagination.limit)
                .select('type email createdAt')
                .lean()
                .exec(),
            User
                .countDocuments()
        ]);
        res.status(200).json({
            limit: pagination.limit,
            total,
            page: pagination.page,
            totalPages: Math.ceil(total / pagination.limit),
            user
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const postUser = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        }
        let salt = await passwordEncryption.salt();
        req.body.salt = salt;
        req.body.password = await passwordEncryption.encryptPassword(password, salt)
        let user = new User(req.body);
        user = await user.save();
        return res.status(200).json({ messages: messages.generic.create });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}
const deleteUser = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        if (!id) return res.status(400).json({ message: messages.generic.requiredFieldsMissing });
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: messages.generic.removed });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });

    }
}
module.exports = {
    signIn,
    signUp,
    getUser,
    postUser,
    deleteUser
}