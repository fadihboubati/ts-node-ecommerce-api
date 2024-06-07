import { HttpException } from "./root";

export class BadRequestException extends HttpException {
    constructor(message: string, errorCode: number, error: any = null) {
        super(message, errorCode, 400, error);
    }
}