'use strict';

const jwt = require('jsonwebtoken');
const { config } = require('../config/config')

function createToken(user, isAdmin = false) {
    let scopes = `admin`;
    // if (user.type) {
    //    if (user.type === "ssid"){
    //        scopes="ssid"
    //    }
    //       if(user.type === "admin"){
    //        scopes="admin"

    //       }
    // } else {
    //     scopes = "admin"
    // }
    // Sign the JWT
    return jwt.sign({ id: user.email, scope: scopes }, config.development.jwtSecret, { algorithm: 'HS256', expiresIn: "1h" });
}
module.exports = createToken;
