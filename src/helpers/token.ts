'use strict';



const jwt = require('jsonwebtoken');
const { config } = require('../config/config')


let decodeToken = function (token: string): string {
    try {

        let decode: string = jwt.verify(token, config.development.jwtSecret);
        if (!decode) {
            throw (new Error('Not a valid token!'));
        }
        return decode;
    } catch (error) {
        throw (error);
    }
}
export = { decodeToken }   
