import { PartialType } from '@nestjs/swagger';
import { CreateEhrProviderDto } from './create-ehr-provider.dto';

export class UpdateEhrProviderDto extends PartialType(CreateEhrProviderDto) {}
