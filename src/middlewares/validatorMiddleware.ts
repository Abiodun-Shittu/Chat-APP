import { Request, Response, NextFunction } from "express";
import { InvalidBodyParameterException } from "../exceptions/invalidParamsException";

export const validateRequiredParams = (requiredParams: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const missingParams = requiredParams.filter(
				(param) => !req.body[param]
			);

			if (missingParams.length > 0) {
				throw new InvalidBodyParameterException(
					`${missingParams} is required`
				);
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};
