import { PartialType } from '@nestjs/swagger';
import { CreateEhrIntegrationDto } from './create-ehr-integration.dto';

export class UpdateEhrIntegrationDto extends PartialType(
  CreateEhrIntegrationDto,
) {}
