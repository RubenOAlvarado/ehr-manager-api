import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BaseQuestionsModule } from 'src/base-questions/base-questions.module';
import { QuestionSetsModule } from 'src/question-sets/question-sets.module';

@Module({
  imports: [PrismaModule, BaseQuestionsModule, QuestionSetsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
