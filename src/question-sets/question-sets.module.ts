import { Module } from '@nestjs/common';
import { QuestionSetsService } from './question-sets.service';
import { QuestionSetsController } from './question-sets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [PrismaModule, ClientsModule],
  controllers: [QuestionSetsController],
  providers: [QuestionSetsService],
  exports: [QuestionSetsService],
})
export class QuestionSetsModule {}
