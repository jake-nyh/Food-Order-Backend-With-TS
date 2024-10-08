import logger from "./utils/logger";
import express from "express";
import App from "./services/expressApp";
import connectDb from "./services/database";
import "dotenv/config";
import configureCronJob from "./services/cron";

const startServer = async () =>
{
    try
    {
        const app = express();
        await App(app);
        const port = process.env.PORT || 5000;
        app.listen(port, async () =>
        {
            logger.info(`The server is running on ${port}`);
            await connectDb();
            await configureCronJob()
        });

    } catch (err)
    {
        console.log(err);
    }

};

startServer();

