import prisma from "../config/prisma.js";
import { comparePassword, generateSalt, hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/tokens.js";
import { AppError } from "../utils/error.class.js";
// response the decoded jwt everytime with token
export const responseUser = (req, res) => {
    res.status(200).json({
        user: req.user,
        token: req.token,
    });
};
// sign up user
export const handleSignUp = async (req, res) => {
    const { name, email, password, profileUrl } = req.body.signUpData;
    const normalizedEmail = typeof email === "string" ? email.toLowerCase() : email;
    const userExist = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });
    if (userExist) {
        throw new AppError(409, "User Email Already Exist");
    }
    const salt = await generateSalt(10);
    const hashedPassword = await hashPassword(password, salt);
    const user = await prisma.user.create({
        data: {
            email: normalizedEmail,
            name,
            password: hashedPassword,
            salt,
            profileUrl,
        },
    });
    const token = generateToken({
        uid: user.id,
        isAdmin: user.isAdmin,
        role: user.isAdmin ? "admin" : "user",
    }, "5d");
    res.status(201).json({
        message: "Signup successful",
        token,
        user: { id: user.id, email: user.email, name: user.name },
    });
};
// sign in user
export const handleSignIn = async (req, res) => {
    const { email, password } = req.body.signInData;
    const normalizedEmail = typeof email === "string" ? email.toLowerCase() : email;
    const userExist = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });
    if (!userExist) {
        throw new AppError(404, "User not found");
    }
    const isPasswordCorrect = await comparePassword(password, userExist.password);
    if (!isPasswordCorrect) {
        throw new AppError(401, "Unauthorized: Incorrect password");
    }
    const token = generateToken({
        uid: userExist.id,
        isAdmin: userExist.isAdmin,
        role: userExist.isAdmin ? "admin" : "user",
    }, "5d");
    res.status(200).json({
        message: "SignIn successful",
        token,
        user: { id: userExist.id, email: userExist.email, name: userExist.name },
    });
};
//# sourceMappingURL=auth.controller.js.map