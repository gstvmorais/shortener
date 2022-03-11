import prisma from "@prisma/client";

const prismaClient = new prisma.PrismaClient();

async function listUsers() {
  const users = await prismaClient.user.findMany({ select: { name: true } });
  console.log(users);
}

async function createUser(name, email, birthDate) {
  await prismaClient.user.create({ data: { email, name, birthDate } });
}
// createUser("Gustavo", "gustavo.morais@gmail.com", new Date());
listUsers();
