import bcrypt, { genSalt, hash, compare } from "bcrypt";
export const generateSalt = async (rounds = 10) => {
    const salt = await genSalt(rounds);
    return salt;
};
export const hashPassword = async (password, salt) => {
    const hashed = await hash(password, salt);
    return hashed;
};
export const comparePassword = async (password, hash) => {
    const result = await compare(password, hash);
    return result;
};
//# sourceMappingURL=hash.js.map