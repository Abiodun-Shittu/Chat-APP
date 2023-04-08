import { Request, Response, NextFunction } from "express";

export const validateUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { firstName, lastName, email, password } = req.body;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,}$/;
	if (firstName.length <= 2 || lastName.length <= 2) {
		return res
			.status(400)
			.json({
				error: "First name or last name must be at least 2 characters",
			});
	} else if (!emailRegex.test(email)) {
		return res
			.status(400)
			.json({ error: "Please enter a valid email address" });
	} else if (!passwordRegex.test(password)) {
		return res
			.status(400)
			.json({
				error: "Your password should include mixed characters and numbers and be at least 8 characters long",
			});
	} else {
		next();
	}
};
