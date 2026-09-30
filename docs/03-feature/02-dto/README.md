# DTOs — Data Transfer Objects

A DTO describes the data that an endpoint expects to receive.

For example, creating a student might require:

```ts
{
  name: string;
  programId: number;
}
```

Instead of accepting an arbitrary object, define the expected structure using a DTO.

Install the validation dependencies:

```bash
npm i class-validator class-transformer @nestjs/mapped-types
```

### What they are used for

| Package                | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `class-validator`      | Validation decorators such as `@IsString()` and `@IsInt()` |
| `class-transformer`    | Transforms incoming values into expected types             |
| `@nestjs/mapped-types` | Creates DTO variants such as partial update DTOs           |

---

# Creating a Create DTO

Create:

```text
src/<feature-folder>/dto/create-<feature-name>.dto.ts
```

Example:

```text
src/students/dto/create-student.dto.ts
```

Basic structure:

```ts
import {} from 'class-validator';

export class CreateStudentDto {}
```

Add validation rules according to the data being accepted.

For example:

```ts
import { IsInt, IsString, Min } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  programId: number;
}
```

The DTO describes and validates the **incoming request**, not the database model itself.

---

# Creating an Update DTO

An update usually allows only some fields to be changed.

Instead of repeating all validation rules, use `PartialType()`:

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
```

`PartialType()` makes the properties optional.

For example:

```ts
CreateStudentDto
```

means:

```text
name       required
programId  required
```

while:

```ts
UpdateStudentDto
```

means:

```text
name       optional
programId  optional
```

This is useful for HTTP `PATCH` requests.
