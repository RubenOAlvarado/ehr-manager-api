import { Module } from '@nestjs/common';
import { PatientsResponsesService } from './patients-responses.service';
import { PatientsResponsesController } from './patients-responses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PatientsModule } from 'src/patients/patients.module';
import { BaseQuestionsModule } from 'src/base-questions/base-questions.module';
import { EhrIntegrationsModule } from 'src/ehr-integrations/ehr-integrations.module';

@Module({
  imports: [
    PrismaModule,
    PatientsModule,
    BaseQuestionsModule,
    EhrIntegrationsModule,
  ],
  controllers: [PatientsResponsesController],
  providers: [PatientsResponsesService],
  exports: [PatientsResponsesService],
})
export class PatientsResponsesModule {}
