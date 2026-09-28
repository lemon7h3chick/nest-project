# Seeding Data

Seeding is the process of inserting initial or sample data into a database.

It is useful for:

* Development
* Testing
* Demonstrations
* Prototypes
* Populating related tables with sample data

A seed script runs independently from the NestJS application.

Therefore, **NestJS Dependency Injection is not available inside the seed script**.

---

## Installing Seed Dependencies

Install Faker to generate sample data:

```bash
npm i @faker-js/faker
```

Install `tsx` so TypeScript seed files can be executed:

```bash
npm i -D tsx
```

---

## Creating the Seed File

Create:

```text
prisma/seed.ts
```

Because the seed script runs independently from NestJS, create the Prisma service yourself:

```ts
const prisma = new PrismaService();
```

There is no NestJS Dependency Injection container running the seed script.

---

# Configuring the Seed Command

In `prisma.config.ts`:
Or if using prisma7 `prisma7.config.ts`:

```ts
migrations: {
  path: 'prisma/migrations',
  seed: 'tsx prisma/seed.ts',
},
```

The `seed` command tells Prisma how to execute the seed file.

---

# Running the Seed

Run:

```bash
npx prisma db seed
```

Prisma will execute:

```text
tsx prisma/seed.ts
```
