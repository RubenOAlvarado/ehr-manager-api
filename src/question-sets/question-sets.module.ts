import { Module } from '@nestjs/common';
import { QuestionSetsService } from './question-sets.service';
import { QuestionSetsController } from './question-sets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientsModule } from 'src/clients/clients.module';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [PrismaModule, ClientsModule, QuestionsModule],
  controllers: [QuestionSetsController],
  providers: [QuestionSetsService],
})
export class QuestionSetsModule {}
