# Seeding Related Data

When tables have relationships, create the records in dependency order.

For example:

```text
Program
   ↓
Student
   ↓
Remark
```

A student requires a `programId`, and a remark requires a `studentId`.

Therefore:

```text
Create Programs
      ↓
Get Program IDs
      ↓
Create Students
      ↓
Get Student IDs
      ↓
Create Remarks
```

---

## Example Seed

```ts
const programNames = [
  'BS Information Technology',
  'BS Computer Science',
  'BS Information Systems',
];

const programsData = programNames.map((name) => ({
  name,
}));

await prisma.program.createMany({
  data: programsData,
});

const programs = await prisma.program.findMany();
```

Generate advisers using the program IDs:

```ts
const advisersData = programs.map((program) => ({
  name: 'Prof. ' + faker.person.fullName(),
  programId: program.id,
}));

await prisma.adviser.createMany({
  data: advisersData,
});
```

Generate students:

```ts
const studentsData = programs.flatMap((program) =>
  Array.from({ length: STUDENTS_PER_PROGRAM }, () => ({
    name: faker.person.fullName(),
    programId: program.id,
  })),
);

const students = await prisma.student.createManyAndReturn({
  data: studentsData,
});
```

Generate remarks using the student IDs:

```ts
const remarksData = students.flatMap((student) =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 4 }) },
    () => ({
      content: faker.lorem.sentence(),
      studentId: student.id,
    }),
  ),
);

await prisma.remark.createMany({
  data: remarksData,
});
