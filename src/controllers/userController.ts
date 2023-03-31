import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import { errorResponse, successResponse } from "../services/response";
import { httpErrors } from "../services/errors";

export const createUser = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		// Check if email already exists
		const checkIfEmailExists = await User.findOne({
			where: { email: email },
		});
		if (checkIfEmailExists) {
			return errorResponse(res, httpErrors.AccountExists , "Email already exists");
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = await User.create({
			uuid: uuidv4(),
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		return successResponse(res, "User created successfully", { newUser: newUser });
	} catch (error) {
		console.log(error);
		return errorResponse(
			res,
			httpErrors.ServerError,
			"Server error, please contact the administrator"
		);
	}
};
