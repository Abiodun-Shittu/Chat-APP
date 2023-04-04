import { NextFunction, Request, Response } from "express";
import { ClientErrorException } from "../services/exceptions/clientErrorException";
import { ConflictException } from "../services/exceptions/conflictException";
import { InvalidBodyParameterException } from "../services/exceptions/invalidParamsException";
import { NotFoundException } from "../services/exceptions/notFoundException";
import { UnauthorizedException } from "../services/exceptions/unauthorizedException";
import { UnauthenticatedException } from "../services/exceptions/unauthenticatedException";
import { ServerError } from "../services/exceptions/serverError";

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = 500;
	let message = "Server error, please contact the administrator";

	if (err instanceof ClientErrorException) {
		statusCode = err.statusCode;
		message = err.message
	} else if (err instanceof ConflictException) {
		statusCode = err.statusCode
		message = err.message;
	} else if (err instanceof InvalidBodyParameterException) {
		statusCode = err.statusCode
		message = err.message
	} else if (err instanceof NotFoundException) {
		statusCode = err.statusCode
		message = err.message
	} else if (err instanceof UnauthenticatedException) {
		statusCode = err.statusCode
		message = err.message
	} else if (err instanceof UnauthorizedException) {
		statusCode = err.statusCode
		message = err.message
	} else if (err instanceof ServerError) {
		statusCode = err.statusCode
		message = err.message
	}

	return res.status(statusCode).json({ statusCode, message });

};
