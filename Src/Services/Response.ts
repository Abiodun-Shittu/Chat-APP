import { Response } from 'express';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
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
