import { Module } from '@nestjs/common';
import { EhrProvidersService } from './ehr-providers.service';
import { EhrProvidersController } from './ehr-providers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EhrProvidersController],
  providers: [EhrProvidersService],
  exports: [EhrProvidersService],
})
export class EhrProvidersModule {}
