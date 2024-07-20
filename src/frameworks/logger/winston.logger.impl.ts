// src/frameworks/logger/winston.logger.impl.ts
import { LoggerService } from "../../application/services/logger.service";
import winston from "winston";
import { LOG_LEVEL } from "../../main/config/constants";

const { combine, timestamp, align, colorize, errors, printf } = winston.format;

export default class Logger implements LoggerService {
  private logger = winston.createLogger({
    level: LOG_LEVEL,
    format: combine(
      errors({ stack: true }),
      colorize({ all: true }),
      timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A Z",
      }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
    ),
    transports: [new winston.transports.Console()]
  });

  debug(message: unknown): void {
    this.logger.debug(message);
  }

  info(message: unknown): void {
    this.logger.info(message);
  }

  error(message: unknown, err?: Error): void {
    if (err) {
        this.logger.error(`${message}: ${err.message}`, { stack: err.stack });
    } else {
        this.logger.error(String(message));
    }
}

  warning(message: unknown): void {
    this.logger.warning(message);
  }
}
