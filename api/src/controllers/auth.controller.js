import asyncHandler from 'express-async-handler';
import db from '../models/index.js';
import {tokenGenerator} from '../utils/index.js';

const {User, Token} = db;

// @ desc --- Create new user
// @ route  --POST-- [base_api]/auth/signup
const signUp = asyncHandler(async (req, res) => {
    const {username, password, confirmPassword} = req.body;

    if (password !== confirmPassword) {
        res.status(400);
        throw new Error("Passwords do not match");
    }

    try {
        const usernameExists = await User.findOne({username});
        if (usernameExists) {
            res.status(409);
            throw new Error("username is already taken. Try another one");
        }

        const newUser = new User({
            username,
            password,
        });

        await newUser.save();

        // Generate tokens after user sign up
        const {accessToken, refreshToken} = await tokenGenerator(
            res,
            newUser._id,
            newUser.username,
        );

        // Save refresh token
        const newToken = await Token.create({
            user_id: newUser._id,
            token: refreshToken,
            action: 'auth',
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        await newToken.save();

        res.status(201).json({
            message: "User created successfully",
            details: newUser,
            accessToken
        })
    } catch (error) {
        console.error(error)
        res.status(500)
        throw new Error(error)
    }
});

// @ desc ---- User Login -> set tokens
// @ route  --POST-- [base_api]/auth/signIn
const signIn = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    let user;

    if (username) {
        user = await User.findOne({username});
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
            user._id,
            user.username,
        );

        // save refresh token
        await Token.create({
            user_id: user._id,
            token: refreshToken,
            action: 'auth',
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        });

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
    const {userId} = req.user;

    const destroyToken = await Token.deleteOne({
        user_id: userId,
        action: 'auth'
    });

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
    const {userId} = req.user;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("Unknown User");
    }

    // generate new access token
    const {accessToken} = await tokenGenerator(
        res,
        user._id,
        user.username,
    );

    return res.status(200).json({
        user: user.username,
        accessToken: accessToken
    });
});

export {
    signUp,
    signIn,
    signOut,
    refresh
}
