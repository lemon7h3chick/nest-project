import { faker } from '@faker-js/faker';
import { PrismaService } from '../src/prisma/prisma.service';

const prisma = new PrismaService();
const STUDENTS_PER_PROGRAM = 10;

async function main() {
  const programNames = [
    'BS Information Technology',
    'BS Computer Science',
    'BS Information Systems',
  ];

  const programsData = programNames.map((name) => ({ name }));

  await prisma.program.createMany({ data: programsData });
  const programs = await prisma.program.findMany();

  const studentsData = programs.flatMap((program) =>
    Array.from({ length: STUDENTS_PER_PROGRAM }, () => ({
      name: faker.person.fullName(),
      programId: program.id,
    })),
  );

  await prisma.student.createMany({ data: studentsData });
  const students = await prisma.student.findMany();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
