export class HttpException extends Error {
    message: string;
    errorCode: ErrorCodes;
    statusCode: number;
    errors: ErrorCodes;

    constructor(message: string, errorCode: ErrorCodes, statusCode: number, errors: any) {
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
    INVALID_CREDENTIALS = 1003,
    INTERNAL_SERVER_ERROR = 1004
}