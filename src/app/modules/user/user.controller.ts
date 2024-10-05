import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {

    const result = await UserServices.createUserIntoDB(req.body);

    console.log({result})
    //@ts-ignore
    const {password, ...remainData} = result._doc;
    

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: remainData
    })

    
})


export const UserControllers = {
    createUser
}