import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponsePatientsResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  baseQuestionId: string;

  @ApiProperty()
  response: string;

  @ApiPropertyOptional()
  responseMeta?: Record<string, any>;

  @ApiPropertyOptional()
  sessionId?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
