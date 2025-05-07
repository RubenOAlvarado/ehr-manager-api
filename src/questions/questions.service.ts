import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseQuestionsService } from 'src/base-questions/base-questions.service';
import { QuestionSetsService } from 'src/question-sets/question-sets.service';
import { GetQuestionsParamsDto } from './dto/getQuestions.params.dto';
import { QuestionSetIdQueryDto } from './dto/questionSetId.query.dto';

@Injectable()
export class QuestionsService {
  constructor(
    private prisma: PrismaService,
    private baseQuestionService: BaseQuestionsService,
    private questionSetService: QuestionSetsService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const [validQuestionSet, validBaseQuestion] = await Promise.all([
      this.validateQuestionSet(createQuestionDto.questionSetId),
      this.validateBaseQuestion(createQuestionDto.baseQuestionId),
    ]);
    if (validBaseQuestion && validQuestionSet) {
      return this.prisma.question.create({
        data: createQuestionDto,
      });
    }
  }

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

  private async validateQuestionSet(questionSetId: string) {
    const questionSet = await this.questionSetService.findOne(questionSetId);
    if (!questionSet) {
      throw new BadRequestException('Invalid question set ID');
    }
    return true;
  }

  private async validateBaseQuestion(baseQuestionId: string) {
    const baseQuestion = await this.baseQuestionService.findOne(baseQuestionId);
    if (!baseQuestion) {
      throw new BadRequestException('Invalid base question ID');
    }
    return true;
  }
}
