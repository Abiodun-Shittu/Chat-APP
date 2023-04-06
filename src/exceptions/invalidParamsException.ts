export class InvalidBodyParameterException extends Error {
	statusCode: number;

	constructor(message: string) {
		super(message);
		this.statusCode = 422;
	}
}
