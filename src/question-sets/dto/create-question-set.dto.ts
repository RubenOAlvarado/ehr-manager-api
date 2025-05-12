import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';

export class CreateQuestionSetDto {
  @ApiProperty({
    description: 'The name of the question set',
    example: 'Question Set 1',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'The description of the question set',
    example: 'This is a question set for testing',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The questions of the question set',
    type: CreateQuestionDto,
    required: false,
    isArray: true,
    example: [
      {
        baseQuestionId: '64f2f2f2f2f2f2f2f2f2f2f2',
        question: 'What is your name?',
        questionSetId: '64f2f2f2f2f2f2f2f2f2f2f2',
        languageCode: 'en',
      },
      {
        baseQuestionId: '64f2f2f2f2f2f2f2f2f2f2f2',
        question: 'Wie heisst du?',
        questionSetId: '64f2f2f2f2f2f2f2f2f2f2f2',
        languageCode: 'de',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[];
}
