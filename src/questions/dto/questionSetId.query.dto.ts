import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class QuestionSetIdQueryDto {
  @ApiPropertyOptional({
    description: 'The ID of the question set',
    format: 'uuid',
    type: String,
    example: '3-a456-42661417407',
  })
  @IsOptional()
  @IsUUID()
  questionSetId: string;
}
