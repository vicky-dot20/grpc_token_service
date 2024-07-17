import * as grpc from "@grpc/grpc-js"
import { ErrorTypes } from "../../domain/error/applicationError.factory"
import { OperationalError } from "../../domain/error/opeartional.error"
import OperationalErrorImpl from "./operational.error.impl"

export const ERRORS: Record<string, OperationalError>={
  [ErrorTypes.UNKNOWN]: new OperationalErrorImpl(ErrorTypes.UNKNOWN),
}

export const GRPC_ERRORS: Record<string,grpc.status>={
  [ErrorTypes.UNKNOWN]: grpc.status.UNKNOWN
}