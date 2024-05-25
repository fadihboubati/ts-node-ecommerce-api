import { HttpException } from "./root";

export class unprocessableEntity extends HttpException {
    constructor(message: string, errorCode: number, error: any, ) {
        super(message, errorCode, 422, error);
    }
}  