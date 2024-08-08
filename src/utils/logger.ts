import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize, errors} = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  format: combine(
     colorize(),
     timestamp(), 
     errors({stack: true}),
     myFormat
     ),
  transports: [new transports.Console()],
});

export default logger