import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseEhrIntegrationsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  baseQuestionId: string;

  @ApiProperty()
  ehrProviderCode: string;

  @ApiProperty()
  ehrFieldPath: string;

  @ApiProperty()
  ehrFieldType: string;

  @ApiPropertyOptional()
  transformationRule?: string;

  @ApiProperty()
  ehrEndpoint: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
