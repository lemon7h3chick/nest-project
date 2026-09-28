import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.student.findMany();
  }

  findByProgram(programId: number) {
    return this.prisma.student.findMany({ where: { programId } });
  }
}
