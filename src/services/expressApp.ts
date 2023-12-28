import express, { Request, Response, NextFunction, Application } from "express";    
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "../utils/logger";
import errorHandler from "../middlewares/errorHandler";
import { adminRouter } from "../routes/adminRoute";
import { vendorRouter } from "../routes/vendorRoute";
import path from "path";

export default async (app: Application) =>
{
    //body-parser
    app.use(express.json({ limit: "50mb" }));

    //cookie-parser
    app.use(cookieParser());

    //cors - cross orgin resource sharing
    app.use(
        cors({
            origin: process.env.ORIGIN,
        })
    );

    app.use("/images", express.static(path.join(__dirname, "images")));

    //routes
    app.use("/api/admin", adminRouter);
    app.use("/api/vendor", vendorRouter);

    //test route
    app.get("/", (req: Request, res: Response, next: NextFunction) =>
    {
        res.send("min may ngar loe 2029");
    });

    //err-handler
    app.use(errorHandler);

    //unknown route
    app.all("*", (req: Request, res: Response, next: NextFunction) =>
    {
        const err: any = new Error(`Route ${req.originalUrl} was not found`);
        err.statusCode = 404;
        next(err);
    });

    return app;
}






