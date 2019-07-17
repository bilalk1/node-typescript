'use strict';

import { IUser } from "../models/user.model";

const jwt = require('jsonwebtoken');
const { config } = require('../config/config')

function createToken(user: IUser) {
    return jwt.sign({ email: user.email, scope: user.type }, config.development.jwtSecret, { algorithm: 'HS256', expiresIn: "1h" });
}



let decodeToken = async function (token: string) {
    try {

        let decode = jwt.verify(token, config.development.jwtSecret);
        if (!decode) {
            throw (new Error('Not a valid token!'));
        }
        return decode;
    } catch (error) {
        throw (error);
    }
}
module.exports = { createToken, decodeToken }   
