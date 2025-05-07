import { Module } from '@nestjs/common';
import { BaseQuestionsService } from './base-questions.service';
import { BaseQuestionsController } from './base-questions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BaseQuestionsController],
  providers: [BaseQuestionsService],
  exports: [BaseQuestionsService],
})
export class BaseQuestionsModule {}
