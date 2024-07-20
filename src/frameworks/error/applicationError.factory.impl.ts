
//src/frameworks/error/applicationError.factory.impl.ts
import { ApplicationErrorFactory,Err,ErrorTypes } from "../../domain/error/applicationError.factory";
import {
  OperationalError } from "../../domain/error/opeartional.error"
  import { ERRORS } from "./constants";

  export class ApplicationErrorFactoryImpl implements ApplicationErrorFactory {
getError=(name: string, data?: Err| undefined): OperationalError=> {
  const error = 
  ERRORS[name as keyof typeof ERRORS]  || ERRORS [ErrorTypes.UNKNOWN];
  const params = data || undefined;

  error.init(params);
  return error;
  
}
  } 