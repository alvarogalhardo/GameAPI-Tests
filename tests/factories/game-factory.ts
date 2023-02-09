import prisma from "config/database";
import { faker } from "@faker-js/faker";

export async function createGames(id1: number, id2: number, id3: number) {
    const game1 = await prisma.game.create({
        data: {
            title: faker.name.firstName(),
            consoleId: id1
        },
    });
    const game2 = await prisma.game.create({
        data: {
            title: faker.name.firstName(),
            consoleId: id2
        },
    });
    const game3 = await prisma.game.create({
        data: {
            title: faker.name.firstName(),
            consoleId: id3
        },
    });
    return [game1, game2, game3]
}

export async function createGame(id: number) {
    return prisma.game.create({
        data: {
            title: faker.name.firstName(),
            consoleId: id
        },
    });
}