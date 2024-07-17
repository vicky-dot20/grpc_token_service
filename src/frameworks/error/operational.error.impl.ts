import { ErrorTypes } from "../../domain/error/applicationError.factory";
import { OperationalError } from "../../domain/error/opeartional.error";

export default class OperationalErrorImpl extends OperationalError {
  tostring(): string {
    throw new Error("Method not implemented.");
  }
  data: any;

  constructor (public name:ErrorTypes){
    super();
  }

  toString(): string{
    if(this.data){
      return`${this.name}:${this.data}`;
    }
    return this.name;
  }
}