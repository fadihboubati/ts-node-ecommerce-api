import { HttpException } from "./root";


export class BadRequestException extends HttpException {
    constructor(message: string, errorCode: any) {
        super(message, errorCode, 400, null);
    }
}