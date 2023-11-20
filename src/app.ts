import express, { Request, Response, NextFunction } from "express";
//import routes from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import errorHandler from "./middlewares/errorHandler";
import { adminRouter } from "./routes/adminRoute";
import { vendorRouter } from "./routes/vendorRoute";

const app = express();

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

//routes
app.use("/api/admin", adminRouter);
app.use("/api/vendor", vendorRouter);

//routes(app);

//test route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("min may ngar loe 2029");
});

//err-handler
app.use(errorHandler);

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err: any = new Error(`Route ${req.originalUrl} was not found`);
  err.statusCode = 404;
  next(err);
});

export default app;
