import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientEhrProviderModule } from 'src/client-ehr-provider/client-ehr-provider.module';

@Module({
  imports: [PrismaModule, ClientEhrProviderModule],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
