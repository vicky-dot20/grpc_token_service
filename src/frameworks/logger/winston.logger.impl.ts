import { format } from "path"
import { LoggerService} from "../../application/services/logger.service"
import {LOG_LEVEL} from "../../main/config/constants"
import winston from "winston"


const {combine,timestamp,align,colorize,errors,printf}=winston.format;

export default class Logger implements LoggerService {
  logger = winston.createLogger({
    level: LOG_LEVEL,
    format: combine(
      errors({stack:true}),
      colorize({all:true}),
      timestamp({
        format:"YYYY-MM-DD hh:mm:ss.SSS A Z",
      }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      
    ),
    transports: [new winston.transports.Console()]

  });
  constructor(){}
  debug= (message: string | unknown) :void=>{
    this.logger.debug(message);
  }
  info= (message: string | unknown): void => {
    this.logger.info(message);
  }
  error= (message: string | unknown):void => {
    this.logger.error(message);
  }
  warning=(message: string | unknown):void => {
    this.logger.warning(message);
  }
}