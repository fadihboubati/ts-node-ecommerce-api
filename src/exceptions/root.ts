export class HttpException extends Error {
    message: string;
    errorCode: ErrorCodes;
    statusCode: number;
    errors: any;

    constructor(message: string, errorCode: number, statusCode: number, errors: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }

}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INVALID_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 2001,
    INTERNAL_EXCEPTION = 3001,
    USER_NOT_REGISTERED = 4001
}