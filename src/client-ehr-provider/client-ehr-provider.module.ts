import { Module } from '@nestjs/common';
import { ClientEhrProviderService } from './client-ehr-provider.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EhrProvidersModule } from 'src/ehr-providers/ehr-providers.module';

@Module({
  imports: [PrismaModule, EhrProvidersModule],
  providers: [ClientEhrProviderService],
  exports: [ClientEhrProviderService],
})
export class ClientEhrProviderModule {}
