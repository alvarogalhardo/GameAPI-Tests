import { faker } from "@faker-js/faker";
import app from "app";
import httpStatus from "http-status";
import { number } from "joi";
import supertest from "supertest";
import { createConsole, createConsoles } from "./factories/console-factory";
import { createGame, createGames } from "./factories/game-factory";
import { cleanDb } from "./helpers";

const server = supertest(app);

beforeEach(async () => {
    await cleanDb();
});


describe("GET /games", () => {
    it("should respond with status 200 and return all games", async () => {
        const consoles = await createConsoles();
        await createGames(consoles[0].id, consoles[1].id, consoles[2].id);
        const response = await server.get("/games");
        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    consoleId: expect.any(Number),
                    Console:
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                        })
                }),
            ])
        );
    });
});

describe("GET /games/:id", () => {
    it("should respond with status 404 when there are no games", async () => {
        const response = await server.get(`/games/${Math.random()}`);
        expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 and return a single game", async () => {
        const console = await createConsole()
        const game = await createGame(console.id);
        const response = await server.get(`/games/${game.id}`);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
            })
        );
    });
});

describe("POST /games", () => {
    it("should respond with status 409 when game was already created", async () => {
        const console = await createConsole()
        const game = await createGame(console.id);
        const body = {
            title: game.title,
            consoleId: game.consoleId
        };
        const response = await server.post("/games").send(body);
        expect(response.statusCode).toBe(httpStatus.CONFLICT);
    });
    it("should respond with status 201 and create game", async () => {
        const console = await createConsole()
        const body = {
            title: faker.name.firstName(),
            consoleId: console.id
        };
        const response = await server.post("/games").send(body);
        expect(response.statusCode).toBe(httpStatus.CREATED)
    })
})

