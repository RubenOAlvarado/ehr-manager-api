import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';
import { QuestionSetsModule } from './question-sets/question-sets.module';
import { QuestionsModule } from './questions/questions.module';
import { EhrIntegrationsModule } from './ehr-integrations/ehr-integrations.module';
import { BaseQuestionsModule } from './base-questions/base-questions.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PatientsModule } from './patients/patients.module';
import { PatientsResponsesModule } from './patients-responses/patients-responses.module';
import { LanguagesModule } from './languages/languages.module';
import { EhrProvidersModule } from './ehr-providers/ehr-providers.module';
import { ClientEhrProviderModule } from './client-ehr-provider/client-ehr-provider.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { ApiClientModule } from './api-client/api-client.module';

@Module({
  imports: [
    PrismaModule,
    ClientsModule,
    QuestionSetsModule,
    QuestionsModule,
    EhrIntegrationsModule,
    BaseQuestionsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PatientsModule,
    PatientsResponsesModule,
    LanguagesModule,
    EhrProvidersModule,
    ClientEhrProviderModule,
    AuditLogModule,
    ApiClientModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
