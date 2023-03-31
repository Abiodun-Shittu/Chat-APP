interface Errors {
	[key: string]: {
		type: string;
		code: number;
	};
}

export const httpErrors: Errors = {
	NotFoundError: {
		type: "NotFoundError",
		code: 404,
	},
	ValidationError: {
		type: "ValidationError",
		code: 400,
	},
	ServerError: {
		type: "ServerError",
		code: 500,
	},
	InvalidParameter: {
		type: "InvalidParameter",
		code: 400,
	},
	AccountNotFound: {
		type: "AccountNotFound",
		code: 403,
	},
	AccountExists: {
		type: "AccountExists",
		code: 409,
	},
	InvalidToken: {
		type: "InvalidToken",
		code: 401,
	},
};
