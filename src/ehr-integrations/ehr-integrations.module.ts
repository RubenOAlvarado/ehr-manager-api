import { Module } from '@nestjs/common';
import { EhrIntegrationsService } from './ehr-integrations.service';
import { EhrIntegrationsController } from './ehr-integrations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BaseQuestionsModule } from 'src/base-questions/base-questions.module';
import { ClientEhrProviderModule } from 'src/client-ehr-provider/client-ehr-provider.module';
import { EhrMappingsService } from './ehr-mappings.service';
import { EhrSyncLogsService } from './ehr-sync-log.service';
import { ApiClientModule } from 'src/api-client/api-client.module';

@Module({
  imports: [
    PrismaModule,
    BaseQuestionsModule,
    ClientEhrProviderModule,
    ApiClientModule,
  ],
  controllers: [EhrIntegrationsController],
  providers: [EhrIntegrationsService, EhrMappingsService, EhrSyncLogsService],
  exports: [EhrIntegrationsService],
})
export class EhrIntegrationsModule {}
