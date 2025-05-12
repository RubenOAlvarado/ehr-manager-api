import { ApiProperty } from '@nestjs/swagger';
import { QuestionType, ResponseDataType } from '@prisma/client';

export class ResponseBaseQuestionsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  internalCode: string;

  @ApiProperty()
  questionType: QuestionType;

  @ApiProperty()
  responseDataType: ResponseDataType;

  @ApiProperty()
  validationRules?: Record<string, any>;

  @ApiProperty()
  metadata?: Record<string, any>;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
