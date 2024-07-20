
//src/application/use_cases/usecase.ts
import { ErrorTypes } from "../../domain/error/applicationError.factory";

export type Usecase <I,c,o>  =Readonly<{
input: I;
context:c;
execute: ()=>Promise<o | ErrorTypes>;
}>;