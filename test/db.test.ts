import initiate from "../src/db/db";

describe("Database Connection", () => {
	it("should connect to database", async () => {
		const connect = await initiate();
		expect(connect).toBe("Connection has been established successfully.");
	});

	it("should not connect to database", async () => {
		try {
			process.env.DB_PORT = "1234";
			await initiate();
		} catch (error: any) {
			expect(error).toBe("error");
			expect(error.message).toBe("Unable to connect to the database.");
		}
	});
});
