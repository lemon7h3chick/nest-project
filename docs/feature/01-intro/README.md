# NestJS Modules, Controllers, Services, DTOs, and CRUD

## Creating a Feature

A typical NestJS feature is separated into:

```text
<feature>/
├── dto/
│   ├── create-<feature>.dto.ts
│   └── update-<feature>.dto.ts
├── <feature>.controller.ts
├── <feature>.service.ts
└── <feature>.module.ts
```

Generate the main files:

```bash
nest g module <feature-name>
nest g controller <feature-name>
nest g service <feature-name>
```

In one line:
```bash
nest g resource <feature-name>
```

For example:

```bash
nest g module students
nest g controller students
nest g service students
```

In one line:
```bash
nest g resource students
```

This creates the basic structure for a `students` feature.

---

# Controller vs Service

A useful mental model is:

```text
HTTP Request
     ↓
Controller
     ↓
Service
     ↓
Prisma / Database
```

### Controller

The controller handles the HTTP layer:

* Routes
* Parameters
* Query strings
* Request bodies
* HTTP methods

Example:

```ts
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.studentsService.findOne(id);
}
```

The controller should generally **not contain database logic**.

### Service

The service contains the application's business/data-access logic:

```ts
async findOne(id: number) {
  return this.findStudentOrThrow(id);
}
```

This keeps the controller thin and makes the logic easier to reuse and test.

---

# Injecting a Service Into a Controller

NestJS uses Dependency Injection to provide dependencies.

Inside a controller:

```ts
constructor(
  private readonly studentsService: StudentsService,
) {}
```

The general pattern is:

```ts
constructor(
  private readonly <propertyName>: <ServiceClass>,
) {}
```

For example:

```ts
constructor(
  private readonly usersService: UsersService,
) {}
```

NestJS creates and provides the service instance automatically when it is registered as a provider.

---

# Injecting PrismaService Into a Service

A service can also receive `PrismaService` through Dependency Injection:

```ts
constructor(
  private readonly prisma: PrismaService,
) {}
```

The resulting flow is:

```text
Controller
    ↓
Feature Service
    ↓
PrismaService
    ↓
Database
```

For example:

```ts
@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findAll() {
    return this.prisma.student.findMany();
  }
}
```
