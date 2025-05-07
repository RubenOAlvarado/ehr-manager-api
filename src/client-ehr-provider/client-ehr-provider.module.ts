import { Module } from '@nestjs/common';
import { ClientEhrProviderService } from './client-ehr-provider.service';
import { ClientEhrProviderController } from './client-ehr-provider.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EhrProvidersModule } from 'src/ehr-providers/ehr-providers.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [PrismaModule, EhrProvidersModule, ClientsModule],
  controllers: [ClientEhrProviderController],
  providers: [ClientEhrProviderService],
  exports: [ClientEhrProviderService],
})
export class ClientEhrProviderModule {}
