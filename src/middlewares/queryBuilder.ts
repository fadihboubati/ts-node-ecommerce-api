import { Request, Response,NextFunction } from "express";
import { isEmptyObject } from "../utils/helper";
import { InternalException } from "../exceptions/internal-exception";
import { ErrorCodes } from "../exceptions/root";

export const queryBuilder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query, body, params } = req;
        // Filter out keys with empty objects as values
        const ReqData = Object.fromEntries(
            Object.entries({ query, body, params }).filter(
                ([_, value]) => !isEmptyObject(value),
                ),
            );
        req.reqData = ReqData;
        next();
    } catch (error: any) {
        next(new InternalException("Internal server error" ,ErrorCodes.INTERNAL_EXCEPTION, error?.message || error));
    }
}