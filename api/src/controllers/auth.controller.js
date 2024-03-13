import asyncHandler from 'express-async-handler';
import db from '../models/index.js';

const {sequelize, User, Token} = db;
import {tokenGenerator, nodemailer} from '../utils/index.js';

// @ desc --- Create new user
// @ route  --POST-- [base_api]/auth/signup
const signUp = asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    const t = await sequelize.transaction()

    try {
        const usernameExists = await User.findOne({where: {username}});
        if (usernameExists) {
            res.status(409);
            throw new Error("username is already taken. Try another one");
        }

        const newUser = await User.create({
            username,
            password,
        }, {transaction: t});
        if (!newUser) {
            res.status(500)
            throw new Error('Failed to create user. Try again later')
        }

        await t.commit()
        res.status(201).json({
            message:
                "User created successfully",
            user: {
                userName: newUser.username,
            }
        })
    } catch (error) {
        await t.rollback()
        console.error(error)
        res.status(500)
        throw new Error(error)
    }
})

// @ desc ---- User Login -> set tokens
// @ route  --POST-- [base_api]/auth/signIn
const signIn = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    let user;

    if (username) {
        user = await User.findOne({where: {username}});
    } else {
        res.status(400);
        throw new Error("Email or username is required");
    }

    if (!user) {
        res.status(404);
        throw new Error("Invalid credentials");
    }

    // compare password
    if (await user.matchPassword(password)) {
        const {accessToken, refreshToken} = await tokenGenerator(
            res,
            user.id,
            user.userName,
        );

        // save refresh token
        await Token.create({
            user_id: user.id,
            token: refreshToken,
            action: 'auth',
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        return res.status(200).json({
            user: username,
            accessToken: accessToken,
        });
    } else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});

// @ desc ---- Logout user -> destroy refresh token
// @ route--GET-- [base_api] / auth / sign - out
const signOut = asyncHandler(async (req, res) => {
    const {userId} = req.user

    const destroyToken = await Token.destroy({
        where: {user_id: userId, action: 'auth'}
    })

    if (!destroyToken) {
        res.status(500)
        throw new Error('Failed to logout')
    }

    // clear tokens in http-only cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({message: "Logged Out"});
});

// @ desc ---- Refresh Access Token
// @ route  --POST-- [base_api]/auth/refresh
const refresh = asyncHandler(async (req, res) => {
    const {userId} = req.user
    const user = await User.findByPk(userId)
    if (!user) {
        res.status(404);
        throw new Error("Unknown User");
    }

    // generate new access token
    const {accessToken} = await tokenGenerator(
        res,
        user.id,
        user.userName,
    );


    return res.status(200).json({
        user: user.username,
        accessToken: accessToken
    });
});

export default {
    signUp,
    signIn,
    signOut,
    refresh
}
