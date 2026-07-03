import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespose";
import jwt  from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";


const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payLoad = req.body;
    const user = await userService.registerUserIntoDb(payLoad);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Registered Successfully !!!",
      data: {user},
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const {accessToken} = req.cookies;
    // console.log(req.user, "user request")
    // const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)
    // const verifiedToken = jwt.verify(accessToken, config.jwt_access_secret)
    // if(typeof verifiedToken === 'string'){
    //   throw new Error(verifiedToken)
    // }
    const profile = await userService.getMyProfileFromDb(req.user?.id as string)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Profile Fetched Successfully !!!",
      data: {profile},
    });
  },
);
export const userController = { registerUser, getMyProfile };
