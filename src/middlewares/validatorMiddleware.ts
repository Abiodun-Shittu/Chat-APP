
import { Request, Response, NextFunction } from "express";

export const validateRequiredParams = (requiredParams: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const missingParams = requiredParams.filter(
				(param) => !req.body[param]
			);

			if (missingParams.length > 0) {
				return res.status(422).json({
					error: "Missing required parameters",
					params: missingParams,
				});
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};