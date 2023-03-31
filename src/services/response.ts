import { Response } from "express";

export interface ApiResponse<T> {
	success: Boolean;
	message?: String;
	error?: {
		type: String;
		message: String | Array<Object>;
	};
	payload?: T;
}

export const successResponse = <T>(
	res: Response,
	message: string,
	payload?: T
): Response<ApiResponse<T>> => {
	return res.status(200).json({
		success: true,
		message,
		payload,
	});
};

export const errorResponse = <T>(
	res: Response,
	error: any,
	message: any
): Response<ApiResponse<T>> => {
	let errorCode = error.code || 401;
	return res.status(errorCode).json({
		success: false,
		error: {
			type: error.type,
			message: message,
		},
	});
};
