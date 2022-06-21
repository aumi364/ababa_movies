import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const movies = [];
export const filters = [];
export const filterTypes = [];

async function main() {
  // Do stuff
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
