import { Request, Response, NextFunction } from 'express';
import { InvalidBodyParameterException } from '../Exceptions/InvalidParamsException';

export const validateRequiredParams = (requiredParams: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    let message = '';
    const errors: Record<string, string> = {};

    requiredParams.forEach((requiredParam) => {
      if (!req.body[requiredParam] || req.body[requiredParam].trim() === '') {
        message = 'Unprocessable Entity';
        errors[requiredParam] = `${requiredParam} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      throw new InvalidBodyParameterException(message, errors);
    }
    next();
  };
};
