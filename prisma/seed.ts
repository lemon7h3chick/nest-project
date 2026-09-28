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
  console.log(`Seeded ${programs.length} programs`);

  const advisersData = programs.map((program) => ({
    name: 'Prof. ' + faker.person.fullName(),
    programId: program.id,
  }));

  await prisma.adviser.createMany({ data: advisersData });
  console.log(`Seeded ${advisersData.length} advisers`);

  const studentsData = programs.flatMap((program) =>
    Array.from({ length: STUDENTS_PER_PROGRAM }, () => ({
      name: faker.person.fullName(),
      programId: program.id,
    })),
  );

  await prisma.student.createMany({ data: studentsData });
  const students = await prisma.student.findMany();
  console.log(`Seeded ${students.length} students`);

  const remarksData = students.flatMap((student) =>
    Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
      content: faker.lorem.sentence(),
      studentId: student.id,
    })),
  );

  await prisma.remark.createMany({ data: remarksData });
  console.log(`Seeded ${remarksData.length} remarks`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
