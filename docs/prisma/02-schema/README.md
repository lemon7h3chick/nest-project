# Prisma Schema

The Prisma schema defines the structure of the database.

The main file is:

```text
prisma/schema.prisma
```

A useful way to organize model fields is:

```text
IDs / basic fields
        ↓
Foreign keys
        ↓
Relations
        ↓
Timestamps / metadata
        ↓
Indexes / mappings
```

Example:

```prisma
model Student {
  id        Int     @id @default(autoincrement())
  name      String
  programId Int

  program   Program @relation(fields: [programId], references: [id])

  createdAt DateTime @default(now())
}
```

### Foreign Key vs Relation

These two fields have different purposes:

```prisma
programId Int
program   Program @relation(fields: [programId], references: [id])
```

`programId` is the actual foreign key stored in the database.

`program` is the Prisma relation field used when working with related data in TypeScript.

---

## Migrating the Schema

After creating or changing your Prisma schema:

```bash
npx prisma migrate dev --name <migration_name>
```

`migrate dev` is intended for development. It creates a migration and applies it to your development database.

Example:

```bash
npx prisma migrate dev --name create_student
```

After changing the schema, regenerate Prisma Client:

```bash
npx prisma generate
```

This makes the generated Prisma Client match the current schema.
