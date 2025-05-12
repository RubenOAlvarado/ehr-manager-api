import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuestionType, ResponseDataType } from '@prisma/client';

export class CreateBaseQuestionDto {
  @ApiProperty({
    description: 'The question internal code',
    example: 'Q1',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Internal code is required' })
  @IsString()
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

  @ApiPropertyOptional({
    description: 'Validation rules for the question',
    example: {
      required: 'true',
    },
    type: Object,
    required: false,
  })
  @IsOptional()
  @IsObject()
  validationRules?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'The question metadata',
    example: {
      label: 'Question 1',
      description: 'This is a question',
    },
    required: false,
    type: String,
  })
  metadata?: Record<string, any>;
}
