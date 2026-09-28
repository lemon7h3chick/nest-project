import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: String;

  @IsInt()
  @Min(1)
  programId: number;
}
