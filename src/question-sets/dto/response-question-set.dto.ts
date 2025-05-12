import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseQuestionDto } from 'src/questions/dto/response-question.dto';

export class ResponseQuestionSetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  questions?: ResponseQuestionDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
