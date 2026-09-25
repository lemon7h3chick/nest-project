# PrismaService

A shared `PrismaService` allows different NestJS services to use the same Prisma Client.

Generate the module and service:

```bash
nest g module prisma
nest g service prisma
```

In `main.ts`:
```ts
import 'dotenv/config';
```

Install the PostgreSQL adapter:

```bash
npm i @prisma/adapter-pg pg
```

### `src/prisma/prisma.service.ts`

```ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

### Why `OnModuleInit` and `OnModuleDestroy`?

`onModuleInit()` connects Prisma when the NestJS application starts.

```ts
async onModuleInit() {
  await this.$connect();
}
```

`onModuleDestroy()` disconnects Prisma when the application shuts down.

```ts
async onModuleDestroy() {
  await this.$disconnect();
}
```

This gives the application a clear database connection lifecycle.

## Making PrismaService Global

### `src/prisma/prisma.module.ts`

```ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

`@Global()` allows the module's exported providers to be available throughout the application without importing `PrismaModule` into every feature module.

The service must still be exported:

```ts
exports: [PrismaService]
```

---

## Using PrismaService in a Service

Inject `PrismaService` through the constructor:

```ts
constructor(private readonly prisma: PrismaService) {}
```

Then database operations can be performed through:

```ts
this.prisma.student.findMany();
```

```ts
this.prisma.student.create({
  data: {
    name: 'John',
    programId: 1,
  },
});
```

This is NestJS **Dependency Injection**: Nest provides the `PrismaService` instance to the class that needs it.
