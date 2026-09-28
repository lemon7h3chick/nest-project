import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll(
    @Query('programId', new ParseIntPipe({ optional: true })) programId: number,
  ) {
    if (programId !== undefined) {
      return this.studentsService.findByProgram(programId);
    }

    return this.studentsService.findAll();
  }
}
