import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class QuestionSetIdParamDto {
  @ApiProperty({
    description: 'The ID of the question set',
    example: '3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  questionSetId: string;
}
