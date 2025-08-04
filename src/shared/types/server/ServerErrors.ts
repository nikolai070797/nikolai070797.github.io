import { ErrorCode } from "./ErrorCode";

export type ServerErrors = {
  errors: {
    extensions: {
      code: ErrorCode;
    };

    name: string;
    fieldName?: string;
    stack: string;
    message: string;
  }[];
}