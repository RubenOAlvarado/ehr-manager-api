import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBaseQuestionDto } from './dto/create-base-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseQuestionIdParamDto } from './dto/base-question-id.param.dto';

@Injectable()
export class BaseQuestionsService {
  constructor(private prisma: PrismaService) {}

  create(createBaseQuestionDto: CreateBaseQuestionDto) {
    return this.prisma.baseQuestion.create({
      data: {
        ...createBaseQuestionDto,
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

  findAll() {
    return this.prisma.baseQuestion.findMany();
  }

  async update(
    { questionId }: BaseQuestionIdParamDto,
    updateBaseQuestionDto: CreateBaseQuestionDto,
  ) {
    const existingQuestion = await this.findOne(questionId);
    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }
    return this.prisma.baseQuestion.update({
      where: {
        id: questionId,
      },
      data: {
        ...updateBaseQuestionDto,
      },
    });
  }
}
