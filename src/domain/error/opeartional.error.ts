export type ErrorDataType = 
    | string
    | number
    | object
    | []
    | void
    | boolean
    | Error;

export abstract class OperationalError extends Error {
  name = "";
  protected data: ErrorDataType ={};

  constructor(){
    super();
    Error.captureStackTrace(this,this.constructor);
  }
  init(data: ErrorDataType): void {
    this.data =data;
  }
  abstract tostring(): string;
}