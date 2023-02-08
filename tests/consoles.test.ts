import app from "app";
import supertest from "supertest";
import { cleanDb } from "./helpers";

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe("GET /consoles", () => {
  it("should respond with status 200 and return all consoles", async () => {
    const response = await server.get("/consoles");
    console.log(response);
  });
});
