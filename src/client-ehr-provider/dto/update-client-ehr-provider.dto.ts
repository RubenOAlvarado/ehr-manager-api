import { PartialType } from '@nestjs/swagger';
import { CreateClientEhrProviderDto } from './create-client-ehr-provider.dto';

export class UpdateClientEhrProviderDto extends PartialType(
  CreateClientEhrProviderDto,
) {}
