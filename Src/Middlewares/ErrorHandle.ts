import { NextFunction, Request, Response } from "express";
import { ClientErrorException } from "../Exceptions/ClientErrorException";
import { ConflictException } from "../Exceptions/ConflictException";
import { InvalidBodyParameterException } from "../Exceptions/InvalidParamsException";
import { NotFoundException } from "../Exceptions/NotFoundException";
import { UnauthorizedException } from "../Exceptions/UnauthorizedException";
import { UnauthenticatedException } from "../Exceptions/UnauthenticatedException";
import { ServerError } from "../Exceptions/ServerError";

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = 500;
	let message = "Server error, please contact the administrator";
	let errors: Record<string, string> = {};

	if (err instanceof ClientErrorException) {
		statusCode = err.statusCode;
		message = err.message;
	} else if (err instanceof ConflictException) {
		statusCode = err.statusCode;
		message = err.message;
	} else if (err instanceof InvalidBodyParameterException) {
		statusCode = err.statusCode;
		message = err.message;
		errors = err.errors;
	} else if (err instanceof NotFoundException) {
		statusCode = err.statusCode;
		message = err.message;
	} else if (err instanceof UnauthenticatedException) {
		statusCode = err.statusCode;
		message = err.message;
	} else if (err instanceof UnauthorizedException) {
		statusCode = err.statusCode;
		message = err.message;
	} else if (err instanceof ServerError) {
		statusCode = err.statusCode;
		message = err.message;
	}
	if (Object.keys(errors).length > 0) {
		return res.status(statusCode).json({ statusCode, message, errors });
	} else {
		return res.status(statusCode).json({ statusCode, message });
	}
};
