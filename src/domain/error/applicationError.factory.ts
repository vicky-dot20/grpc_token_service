import { OperationalError } from "./opeartional.error";

export type Err = string |  {};

export enum ErrorTypes {
  UNKNOWN = "UNKNOWN",
}

export interface ApplicationErrorFactory{
  getError(name: string, data?: Err): OperationalError
}