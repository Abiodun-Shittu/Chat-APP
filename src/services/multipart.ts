import { NextFunction, Request, Response } from "express";
import { IncomingForm } from "formidable";

export const handleFormData = (req: Request, res: Response, next: NextFunction) => {
	if (req.headers["content-type"]?.includes("multipart/form-data")) {
		const form = new IncomingForm();

		form.parse(req, (err, fields) => {
			if (err) {
				next(err);
			}
			req.body = fields;
			next();
		})
	} else {
		next();
	}
};