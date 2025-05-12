import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionSetDto } from './dto/create-question-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsService } from 'src/clients/clients.service';
import { ClientIdParamDto } from 'src/shared/params/client-id.param.dto';
import { PutQuestionSetParamDto } from './dto/put-question-set.param.dto';
import { UpdateQuestionSetDto } from './dto/update-question-set.dto';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class QuestionSetsService {
  constructor(
    private prisma: PrismaService,
    private clientsService: ClientsService,
    private questionService: QuestionsService,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { questions, ...createQuestionSetDto }: CreateQuestionSetDto,
    { clientId }: ClientIdParamDto,
  ) {
    const validClient = await this.clientsService.findOne(clientId);
    if (!validClient) {
      throw new BadRequestException('Invalid clientId');
    }

    await this.prisma.questionSet.create({
      data: {
        ...createQuestionSetDto,
        clientId,
        version: 1,
        isActive: true,
      },
      include: { client: true },
    });

    /* if (questions?.length) {

    } */
  }

  findOne(id: string) {
    return this.prisma.questionSet.findUnique({
      where: { id },
    });
  }

  async findAll({ clientId }: ClientIdParamDto) {
    const validClient = await this.clientsService.findOne(clientId);
    if (!validClient) {
      throw new BadRequestException('Invalid client ID.');
    }
    const questionSets = await this.prisma.questionSet.findMany({
      where: {
        clientId,
        isActive: true,
        deletedAt: null,
      },
      include: {
        questions: true,
      },
    });
    if (!questionSets.length) {
      throw new NotFoundException('No question sets found.');
    }
    return questionSets;
  }

  async update(
    { clientId, questionSetId }: PutQuestionSetParamDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { questions, ...updateQuestionSetDto }: UpdateQuestionSetDto,
  ) {
    const validClient = await this.clientsService.findOne(clientId);
    if (!validClient) {
      throw new BadRequestException('Invalid client ID.');
    }
    const questionSet = await this.prisma.questionSet.findUnique({
      where: { id: questionSetId },
    });
    if (!questionSet) {
      throw new NotFoundException('Question set not found.');
    }
    await this.prisma.questionSet.update({
      where: { id: questionSetId },
      data: {
        ...updateQuestionSetDto,
        version: questionSet.version + 1,
      },
    });
    //if (questions?.length){}
  }
}
