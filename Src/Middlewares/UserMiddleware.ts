import { Request, Response, NextFunction } from "express";
import { InvalidBodyParameterException } from "../Exceptions/InvalidParamsException";

export const validateUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { firstName, lastName, email, password } = req.body;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
	if (firstName.trim().length <= 2 || lastName.trim().length <= 2) {
		throw new InvalidBodyParameterException(
			"First name or last name must be at least 3 characters",
			{}
		);
	} else if (!emailRegex.test(email)) {
		throw new InvalidBodyParameterException(
			"Please enter a valid email address",
			{}
		);
	} else if (!passwordRegex.test(password)) {
		throw new InvalidBodyParameterException(
			"Your password should be minimum of 8 characters containing at least one special character",
			{}
		);
	} else {
		next();
	}
};
