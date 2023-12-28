"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendToken = (user, res) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    const accessTokenExpirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const refreshTokenExpirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const accessTokenOptions = {
        expires: accessTokenExpirationDate,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
    };
    const refreshTokenOptions = {
        expires: refreshTokenExpirationDate,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
    };
    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    res.status(200).json({
        success: true,
        user,
        accessToken,
    });
};
exports.default = sendToken;
