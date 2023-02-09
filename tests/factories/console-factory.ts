import prisma from "config/database";
import { faker } from "@faker-js/faker";

export async function createConsoles() {
  const console1 = await prisma.console.create({
    data: {
      name: faker.name.firstName(),
    },
  });
  const console2 = await prisma.console.create({
    data: {
      name: faker.name.firstName(),
    },
  });
  const console3 = await prisma.console.create({
    data: {
      name: faker.name.firstName(),
    },
  });
  return [console1,console2,console3]
}

export async function createConsole(){
    return prisma.console.create({
        data: {
          name: faker.name.firstName(),
        },
      });
}