import bcrypt from 'bcrypt'

let encryptPassword = async (password: string, salt: string): Promise<string> => {
    return await bcrypt.hashSync(password, salt);
}
const salt = async (): Promise<string> => {
    return await bcrypt.genSaltSync(10);
}
export = {
    encryptPassword,
    salt
}