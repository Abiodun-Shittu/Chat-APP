import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../db/db";

interface UserAttributes {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface UserModel extends Model<UserAttributes>, UserAttributes {}

const User = sequelize.define<UserModel>(
	"User",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);
(async () => {
	await sequelize.sync();
})();

export default User;
