# Prisma 7

Prisma is an ORM that allows a NestJS application to communicate with a database using TypeScript.

## Installing Prisma

Install Prisma CLI and Prisma Client:

```bash
npm i -D prisma@7
npm i @prisma/client@7
```

Initialize Prisma:

```bash
npx prisma init
```

This creates the Prisma configuration and schema files.

---

## Connecting Prisma to PostgreSQL

Add the database connection string to `.env`:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME"
```

General format:

```text
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

For a local PostgreSQL database, the host is usually `localhost` and the default port is `5432`.
