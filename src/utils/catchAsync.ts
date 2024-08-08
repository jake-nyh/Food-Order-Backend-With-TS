import { Request, Response, NextFunction } from "express";

 const asyncHandler = (fn:any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err: any) {
      next(err);
    }
  };
};

export default asyncHandler
