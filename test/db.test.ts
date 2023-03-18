import chai from "chai";
import chaiHttp from "chai-http";
import initiate from "../src/db/db";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Database Connection", () => {
	it("should connect to database", async () => {
		const connect = await initiate();
		expect(connect).to.equal(
			"Connection has been established successfully."
		);
	});

	it("should not connect to database", async () => {
		try {
			process.env.DB_PORT = "1234";
			await initiate();
		} catch (error: any) {
			expect(error).to.be.an("error");
			expect(error.message).to.include(
				"Unable to connect to the database."
			);		
		}
	});
});
