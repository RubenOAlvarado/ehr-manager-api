import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseClientEhrProviderDto } from 'src/client-ehr-provider/dto/response-client-eht-provider.dto';

export class ResponseClientDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  externalId?: string;

  @ApiProperty()
  defaultLanguage: string;

  @ApiProperty()
  ehrProviders?: ResponseClientEhrProviderDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
