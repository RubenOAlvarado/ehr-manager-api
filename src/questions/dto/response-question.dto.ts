import { ApiProperty } from '@nestjs/swagger';

export class ResponseQuestionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  baseQuestionId: string;

  @ApiProperty()
  questionSetId: string;

  @ApiProperty()
  languageCode: string;

  @ApiProperty()
  questionText: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
