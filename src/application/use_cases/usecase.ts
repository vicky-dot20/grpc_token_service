import { ErrorTypes } from "../../domain/error/applicationError.factory";

// Generic use case type
export type Usecase<I, C, O> = Readonly<{
  input?: I;
  context: C;
  execute: () => Promise<O | ErrorTypes>;
}>;
