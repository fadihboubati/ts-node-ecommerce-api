// unauthorized
import {HttpException} from "./root";
export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: number) {
        super(message, errorCode, 401, null);
    }
}
