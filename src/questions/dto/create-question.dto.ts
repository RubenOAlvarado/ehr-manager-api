import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Base question ID',
    example: '3-a456-426614174000',
    required: true,
    type: String,
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'Base question ID is required' })
  @IsUUID()
  baseQuestionId: string;

  @ApiProperty({
    description: 'Question set ID',
    example: '3-a456-426614174000',
    required: true,
    type: String,
    format: 'uuid',
  })
  @IsNotEmpty({ message: 'Question set ID is required' })
  @IsUUID()
  questionSetId: string;

  @ApiProperty({
    description: 'Question language code',
    example: 'en',
    required: true,
    type: String,
    maximum: 5,
    minimum: 2,
  })
  @IsNotEmpty({ message: 'Language code is required' })
  @IsString()
  @MinLength(2, { message: 'Language code must be at least 2 characters long' })
  @MaxLength(5, { message: 'Language code must be at most 5 characters long' })
  languageCode: string;

  @ApiProperty({
    description: 'Question text',
    example: 'What is your name?',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Question text is required' })
  @IsString()
  questionText: string;
}
