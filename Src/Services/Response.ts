import { Response } from "express";

export interface ApiResponse<T> {
	success: Boolean;
	message?: String;
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
