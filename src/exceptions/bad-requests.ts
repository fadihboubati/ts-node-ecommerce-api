import { HttpException } from "./root";

export class BadRequestException extends HttpException {
    constructor(message: string, errorCode: number) {
        super(message, errorCode, 400, null);
    }
}