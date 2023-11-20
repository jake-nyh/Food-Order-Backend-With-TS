import logger from "./utils/logger";
import app from "./app";
import connectDb from "./utils/connect";
import "dotenv/config";

//create server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  logger.info(`The server is running on ${port}`);
  connectDb();
});
