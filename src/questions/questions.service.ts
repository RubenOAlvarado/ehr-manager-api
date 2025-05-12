import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseQuestionsService } from 'src/base-questions/base-questions.service';
import { GetQuestionsParamsDto } from './dto/getQuestions.params.dto';
import { QuestionSetIdQueryDto } from './dto/questionSetId.query.dto';

@Injectable()
export class QuestionsService {
  constructor(
    private prisma: PrismaService,
    private baseQuestionService: BaseQuestionsService,
  ) {}

  async getQuestionsByClientIdAndLanguageCode(
    { clientId, languageCode }: GetQuestionsParamsDto,
    { questionSetId }: QuestionSetIdQueryDto,
  ) {
    const questions = await this.prisma.question.findMany({
      where: {
        questionSet: {
          clientId,
          isActive: true,
          deletedAt: null,
          ...(questionSetId ? { id: questionSetId } : {}),
        },
        languageCode,
      },
      include: {
        baseQuestion: true,
        questionSet: {
          select: {
            id: true,
            name: true,
            description: true,
            version: true,
          },
        },
      },
      orderBy: [
        { questionSet: { name: 'asc' } },
        { baseQuestion: { internalCode: 'asc' } },
      ],
    });

    if (!questions.length) {
      throw new NotFoundException(
        `No questions found for client ID ${clientId} and language code ${languageCode}`,
      );
    }
    return questions;
  }
}
