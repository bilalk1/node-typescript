// /**********************************************************************
//  * Copyright (c) 2018 eActivate Manager , all rights reserved
//  * Proprietary and Confidential Information
//  *
//  * This source file is the property of eActivate Manager, and
//  * may not be copied or distributed in any isomorphic form without
//  * the prior written consent of eActivate Manager.
//  *
//  *
//  * Author: Bilal Iftikhar

//  */

var bcrypt = require('bcrypt');

// let encryptPassword = async (new_password) => {
//     return await bcrypt.hashSync(newpassword, await salt());
// }

let encryptPassword = async (password, salt) => {
    return await bcrypt.hashSync(password, salt);
}
const salt = async () => {
    return await bcrypt.genSaltSync(10);
}
module.exports = {
    encryptPassword,
    salt
}