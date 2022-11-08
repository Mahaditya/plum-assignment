/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";



export const errorHandler = (_err:Error,_req:Request,res:Response,_next:NextFunction)=>{
    res.sendStatus(500)
}