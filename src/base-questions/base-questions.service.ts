import { Injectable } from '@nestjs/common';
import { CreateBaseQuestionDto } from './dto/create-base-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BaseQuestionsService {
  constructor(private prisma: PrismaService) {}

  create(createBaseQuestionDto: CreateBaseQuestionDto) {
    return this.prisma.baseQuestion.create({
      data: {
        ...createBaseQuestionDto,
        validationRules: {},
        metadata: {},
      },
    });
  }

  findOne(id: string) {
    return this.prisma.baseQuestion.findUnique({
      where: {
        id,
      },
    });
  }
}
