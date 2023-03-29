import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		// Check if email already exists
		const checkIfEmailExists = await User.findOne({
			where: { email: email },
		});
		if (checkIfEmailExists) {
			return res.status(404).json({ message: "Email already exists" });
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

		return res
			.status(201)
			.json({ message: "User created successfully", data: newUser });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Server error, please contact the administrator",
		});
	}
};
