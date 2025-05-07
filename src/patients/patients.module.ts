import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [PrismaModule, ClientsModule],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
