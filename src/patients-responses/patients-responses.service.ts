import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePatientsResponseDto } from './dto/create-patients-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatientsService } from 'src/patients/patients.service';
import { BaseQuestionsService } from 'src/base-questions/base-questions.service';
import { PatientIdParamDto } from 'src/shared/params/patient-id.param.dto';
import { Patient, PatientResponse } from '@prisma/client';
import { EhrIntegrationsService } from 'src/ehr-integrations/ehr-integrations.service';

@Injectable()
export class PatientsResponsesService {
  constructor(
    private prisma: PrismaService,
    private patientsService: PatientsService,
    private baseQuestionsService: BaseQuestionsService,
    private ehrIntegrationsService: EhrIntegrationsService,
  ) {}

  private readonly logger = new Logger(PatientsResponsesService.name);

  async create(
    { patientId }: PatientIdParamDto,
    createPatientsResponseDto: CreatePatientsResponseDto[],
  ) {
    if (createPatientsResponseDto.length === 0) {
      throw new BadRequestException('No responses provided');
    }
    const patient = await this.validatePatientId(patientId);
    await Promise.all(
      createPatientsResponseDto.map(async (response) => {
        await this.validateBaseQuestionId(response.baseQuestionId);
      }),
    );
    const createdResponses = await this.prisma.$transaction(
      async (prismaInstance) => {
        const responses = [];
        for (const dto of createPatientsResponseDto) {
          const newResponse = await prismaInstance.patientResponse.create({
            data: {
              patientId,
              ...dto,
            },
          });
          responses.push(newResponse as never);
        }
        return responses as PatientResponse[];
      },
    );

    this.syncResponsesInBackground(patient, createdResponses);

    return createdResponses;
  }

  private async validatePatientId(patientId: string) {
    const patient = await this.patientsService.findOne(patientId, true);
    if (!patient) {
      throw new BadRequestException(`Patient with ID ${patientId} not found`);
    }
    return patient;
  }

  private async validateBaseQuestionId(baseQuestionId: string) {
    const baseQuestion =
      await this.baseQuestionsService.findOne(baseQuestionId);
    if (!baseQuestion) {
      throw new BadRequestException(
        `Base question with ID ${baseQuestionId} not found`,
      );
    }
    return baseQuestionId;
  }

  private syncResponsesInBackground(
    patient: Patient,
    patientResponses: PatientResponse[],
  ) {
    this.ehrIntegrationsService
      .syncPatientResponses(patient, patientResponses)
      .then(
        () => {
          this.logger.log(
            `Synced responses for patient ${patient.id} in the background`,
          );
        },
        (error) => {
          this.logger.error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            `Failed to sync responses for patient ${patient.id} in the background: ${error.message}`,
          );
        },
      );
  }
}
