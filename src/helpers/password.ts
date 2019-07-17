var bcrypt = require('bcrypt');

// let encryptPassword = async (new_password) => {
//     return await bcrypt.hashSync(newpassword, await salt());
// }

let encryptPassword = async (password: string, salt: string): Promise<string> => {
    return await bcrypt.hashSync(password, salt);
}
const salt = async (): Promise<string> => {
    return await bcrypt.genSaltSync(10);
}
module.exports = {
    encryptPassword,
    salt
}