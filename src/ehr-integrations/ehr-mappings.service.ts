import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseQuestionsService } from 'src/base-questions/base-questions.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEhrIntegrationDto } from './dto/create-ehr-integration.dto';
import { PatientResponse } from '@prisma/client';

@Injectable()
export class EhrMappingsService {
  constructor(
    private prisma: PrismaService,
    private baseQuestionService: BaseQuestionsService,
  ) {}

  async create(createEhrIntegrationDto: CreateEhrIntegrationDto) {
    const validBaseQuestionId = await this.baseQuestionService.findOne(
      createEhrIntegrationDto.baseQuestionId,
    );
    if (!validBaseQuestionId)
      throw new BadRequestException('Invalid base question ID');
    return this.prisma.ehrMapping.create({
      data: {
        ...createEhrIntegrationDto,
        isActive: true,
      },
    });
  }

  async getMappingsByProvider(providerCode: string) {
    const mappings = await this.prisma.ehrMapping.findMany({
      where: { ehrProviderCode: providerCode, isActive: true },
      include: { baseQuestion: true },
    });

    if (!mappings.length) throw new NotFoundException('No mappings found');
    return mappings;
  }

  async transformResponses(
    ehrProviderCode: string,
    responses: PatientResponse[],
  ) {
    const transformedData = {};
    for (const response of responses) {
      const [mapping] = await this.prisma.ehrMapping.findMany({
        where: {
          baseQuestionId: response.baseQuestionId,
          ehrProviderCode,
          isActive: true,
        },
      });
      if (!mapping) continue;
      //here we can apply transformation rules for a most robust mapping, but for this example, lets keep it simple
      transformedData[mapping.ehrFieldPath] = response.response;
    }
    return transformedData;
  }
}
