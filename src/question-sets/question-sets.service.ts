import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionSetDto } from './dto/create-question-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsService } from 'src/clients/clients.service';
import { ClientIdParamDto } from 'src/shared/params/client-id.param.dto';

@Injectable()
export class QuestionSetsService {
  constructor(
    private prisma: PrismaService,
    private clientsService: ClientsService,
  ) {}

  async create(
    createQuestionSetDto: CreateQuestionSetDto,
    { clientId }: ClientIdParamDto,
  ) {
    const validClient = await this.clientsService.findOne(clientId);
    if (!validClient) {
      throw new BadRequestException('Invalid clientId');
    }

    return this.prisma.questionSet.create({
      data: {
        ...createQuestionSetDto,
        clientId,
        version: 1,
        isActive: true,
      },
      include: { client: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.questionSet.findUnique({
      where: { id },
    });
  }
}
