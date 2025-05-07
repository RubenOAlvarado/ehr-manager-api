import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEnum, IsNotEmpty } from 'class-validator';
import { QuestionType, ResponseDataType } from '@prisma/client';

export class CreateBaseQuestionDto {
  @ApiProperty({
    description: 'The question internal code',
    example: 'Q1',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Internal code is required' })
  @IsAlphanumeric()
  internalCode: string;

  @ApiProperty({
    description: 'The question type (Text, Multiple Choice, Boolean, Scale)',
    example: 'Text',
    required: true,
    type: String,
    enum: QuestionType,
    default: 'text',
  })
  @IsNotEmpty({ message: 'Question type is required' })
  @IsEnum(QuestionType)
  questionType: QuestionType;

  @ApiProperty({
    description:
      'The question response data type (String, Number, Boolean, Array)',
    example: 'String',
    required: true,
    type: String,
    enum: ResponseDataType,
    default: 'string',
  })
  @IsNotEmpty({ message: 'Response data type is required' })
  @IsEnum(ResponseDataType)
  responseDataType: ResponseDataType;
}
