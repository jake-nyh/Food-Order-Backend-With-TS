import logger from "../utils/logger";
import 'dotenv/config'

const mongoose = require("mongoose");

export default async () => {
  try {
    const database_url: string = process.env.MONGO_URL || '';
    await mongoose
      .connect(database_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(logger.info("Database connection successful"));
  } catch (error) {
    logger.error("Error happening in database connection", error);
    process.exit(1);
  }
};


