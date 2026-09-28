import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  getStudentsByProgram(programId: number) {
    return this.prisma.student.findMany({ where: { programId } });
  }
}
