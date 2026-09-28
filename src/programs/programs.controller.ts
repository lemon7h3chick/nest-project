import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProgramsService } from './programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Get(':id/students')
  getStudentsByProgram(@Param('id', ParseIntPipe) programId: number) {
    return this.programsService.getStudentsByProgram(programId);
  }
}
