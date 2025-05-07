import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponsePatientDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  clientId: string;

  @ApiPropertyOptional()
  externalId?: string;

  @ApiProperty()
  basicInfo: Record<string, any>;

  @ApiPropertyOptional()
  preferredLanguage?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
