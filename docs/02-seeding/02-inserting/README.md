# Bulk Inserting With `createMany()`

When inserting multiple records, use `createMany()` instead of repeatedly calling `create()` when you do not need each created object immediately.

```ts
await prisma.user.createMany({
  data: usersData,
});
```

This is useful for seed data because it performs a bulk insertion.

Instead of:

```ts
for (const user of usersData) {
  await prisma.user.create({
    data: user,
  });
}
```

you can use:

```ts
await prisma.user.createMany({
  data: usersData,
});
```

### General rule

```text
One record
    → create()

Many records
    → createMany()
```

---

# `createManyAndReturn()`

Sometimes you need the records that were just created, especially when their generated IDs are needed for another table.

In supported databases, Prisma provides:

```ts
createManyAndReturn()
```

Example:

```ts
const students = await prisma.student.createManyAndReturn({
  data: studentsData,
});
```

Now `students` contains the created records.

This is useful when creating related records:

```text
Create students
      ↓
Get their generated IDs
      ↓
Create remarks using studentId
```

Without `createManyAndReturn()`, another option is:

```ts
await prisma.student.createMany({
  data: studentsData,
});

const students = await prisma.student.findMany();
```

However, `findMany()` retrieves records from the database, so if the database already contains data, it may retrieve more records than the ones just inserted.

---

# Generating Seed Data

## `map()`

Use `map()` when transforming every item in an array.

```ts
const data = names.map((name) => ({
  name,
}));
```

For example:

```ts
const programNames = [
  'BS Information Technology',
  'BS Computer Science',
  'BS Information Systems',
];

const programsData = programNames.map((name) => ({
  name,
}));
```

---

## `flatMap()`

Use `flatMap()` when one item needs to produce multiple items and you want a single flattened array.

Example:

```ts
const studentsData = programs.flatMap((program) =>
  Array.from({ length: 10 }, () => ({
    name: faker.person.fullName(),
    programId: program.id,
  })),
);
```

If there are 3 programs and 10 students per program:

```text
3 programs × 10 students = 30 students
```

`flatMap()` produces one array containing all 30 students.

---

## `Array.from()`

Use `Array.from()` when you need to generate a specific number of records.

```ts
Array.from({ length: 10 }, () => ({
  name: faker.person.fullName(),
}));
```

This creates 10 objects.

It is particularly useful when generating fake data with Faker.
