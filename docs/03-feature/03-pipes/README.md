# ValidationPipe

DTO decorators do not automatically validate requests. NestJS needs a `ValidationPipe`.

In `main.ts`:

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
);
```

### `whitelist`

```ts
whitelist: true
```

Removes properties that are not defined in the DTO.

For example, if the DTO contains:

```ts
class CreateStudentDto {
  name: string;
  programId: number;
}
```

and the client sends:

```json
{
  "name": "John",
  "programId": 1,
  "isAdmin": true
}
```

`isAdmin` is not part of the DTO, so it is removed.

### `transform`

```ts
transform: true
```

Allows NestJS to transform incoming values according to the expected types.

This is particularly useful with pipes and DTO validation.

---

# Pipes

Pipes can transform or validate incoming data before it reaches the controller handler.

A common example is `ParseIntPipe`.

```ts
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.studentsService.findOne(id);
}
```

HTTP route parameters arrive as strings.

For example:

```text
GET /students/10
```

The value from `@Param()` is initially:

```ts
"10"
```

`ParseIntPipe` converts it to:

```ts
10
```

So the service receives a number.

---

# Optional Query Parameters

For optional query parameters:

```ts
@Get()
findAll(
  @Query('programId', new ParseIntPipe({ optional: true }))
  programId?: number,
) {
  if (programId !== undefined) {
    return this.studentsService.findByProgram(programId);
  }

  return this.studentsService.findAll();
}
```

This allows both:

```text
GET /students
```

and:

```text
GET /students?programId=1
```

The first retrieves all students.

The second retrieves students belonging to program `1`.

The important pattern is:

```text
Optional query parameter
        ↓
Does it exist?
   ↙          ↘
 Yes           No
  ↓             ↓
filtered       all
results       results
```
