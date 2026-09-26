import { PrismaService } from '../src/prisma/prisma.service';

const prisma = new PrismaService();

async function main() {}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
