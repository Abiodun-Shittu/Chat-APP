import { Request, Response, NextFunction } from "express";
import { InvalidBodyParameterException } from "../Exceptions/InvalidParamsException";

export const validateRequiredParams = (requiredParams: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			let message: string = "";
			const errors: Record<string, string> = {};

			requiredParams.forEach((requiredParam) => {
				if (!req.body[requiredParam]) {
					message = "Unprocessable Entity";
					errors[requiredParam] = `${requiredParam} is required`;
				}
			});

			if (Object.keys(errors).length > 0) {
				throw new InvalidBodyParameterException(message, errors);
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};
