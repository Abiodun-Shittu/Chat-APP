import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../Models/UserModel";
import { ConflictException } from "../Exceptions/ConflictException";
import { successResponse } from "../Services/Response";

const salt = Number(process.env.HASHING_SALT)

export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		// Check if email already exists
		const checkIfEmailExists = await User.findOne({
			where: { email: email },
		});
		if (checkIfEmailExists) {
			throw new ConflictException("Email already exists");
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user
		const newUser = await User.create({
			uuid: uuidv4(),
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		return successResponse(res, "User created successfully", { newUser });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
