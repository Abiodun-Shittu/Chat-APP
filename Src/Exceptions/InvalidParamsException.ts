export class InvalidBodyParameterException extends Error {
	statusCode: number;
	errors: Record<string, string>;

	constructor(message: string, errors: Record<string, string>) {
		super(message);
		this.statusCode = 422;
		this.errors = errors;
	}
}
