import jwt from "jsonwebtoken";
const {sign} = jwt
import { authConfig } from '../config/index.js';

const tokenGenerator = async (res, userId, email,) => {
    const accessToken = await sign(
        {userId, email},
        authConfig.jwt_access_token_secret,
        {
            expiresIn: "6h",
        }
    );

    const refreshToken = sign(
        {userId},
        authConfig.jwt_refresh_token_secret,
        {
            expiresIn: "7d",
        }
    );

    // Set access token in HTTP-only cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return { accessToken, refreshToken };
}

export default tokenGenerator

