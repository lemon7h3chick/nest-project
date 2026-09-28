# Readability in Seed Scripts

Separate **data generation** from **database operations** when the generation becomes complicated.

Prefer:

```ts
const remarksData = students.flatMap((student) =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 4 }) },
    () => ({
      content: faker.lorem.sentence(),
      studentId: student.id,
    })),
);

await prisma.remark.createMany({
  data: remarksData,
});
```

over putting everything inside `createMany()`.

The performance is essentially the same. The separated version is easier to:

* Read
* Debug
* Inspect
* Modify
* Reuse

---

# Counting Seeded Records

When you don't need the created records, use the result of `createMany()`:

```ts
const result = await prisma.user.createMany({
  data: usersData,
});

console.log(`Seeded ${result.count} users`);
```

If you already need the records:

```ts
const users = await prisma.user.createManyAndReturn({
  data: usersData,
});

console.log(`Seeded ${users.length} users`);
```

# Seed Data Mental Model

When writing a seed script, think about **dependencies first**:

```text
What needs to exist first?
        ↓
Create parent records
        ↓
Do I need their generated IDs?
        ↓
Create child records
        ↓
Do I need the child IDs?
        ↓
Create the next level of related records
```

For example:

```text
Program
   │
   ├── Adviser
   │
   └── Student
          │
          └── Remark
```

This pattern can be reused for many database designs:

```text
Department
   └── Employee
          └── PerformanceReview
```

```text
Customer
   └── Order
          └── OrderItem
```

```text
Course
   └── Student
          └── Grade
```

The specific models change, but the **parent → child → dependent child** strategy remains the same.
