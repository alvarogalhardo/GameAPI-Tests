import { faker } from "@faker-js/faker";
import app from "app";
import httpStatus from "http-status";
import supertest from "supertest";
import { createConsole, createConsoles } from "./factories/console-factory";
import { cleanDb } from "./helpers";

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe("GET /consoles", () => {
  it("should respond with status 200 and return all consoles", async () => {
    await createConsoles();
    const response = await server.get("/consoles");
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /consoles/:id", () => {
  it("should respond with status 404 when there are no consoles", async () => {
    const response = await server.get(`/consoles/${Math.random()}`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 and return a single console", async () => {
    const console = await createConsole();
    const response = await server.get(`/consoles/${console.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
      })
    );
  });
});

describe("POST /consoles", () => {
  it("should respond with status 409 when console was already created", async () => {
    const console = await createConsole();
    const body = {
      name: console.name,
    };
    const response = await server.post("/consoles").send(body);
    expect(response.statusCode).toBe(httpStatus.CONFLICT);
  });
  it("should respond with status 201 when console was already created", async () => {
    const body = {
      name: faker.name.firstName()
    };
    const response = await server.post("/consoles").send(body);

    expect(response.statusCode).toBe(httpStatus.CREATED)
  })
})
