"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize, errors } = winston_1.format;
const myFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});
const logger = (0, winston_1.createLogger)({
    format: combine(colorize(), timestamp(), errors({ stack: true }), myFormat),
    transports: [new winston_1.transports.Console()],
});
exports.default = logger;
