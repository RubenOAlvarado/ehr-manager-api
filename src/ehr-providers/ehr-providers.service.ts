import { Injectable } from '@nestjs/common';
import { CreateEhrProviderDto } from './dto/create-ehr-provider.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EhrProvidersService {
  constructor(private prisma: PrismaService) {}

  create(createEhrProviderDto: CreateEhrProviderDto) {
    return this.prisma.ehrProvider.create({
      data: {
        ...createEhrProviderDto,
        isActive: true,
      },
    });
  }

  findAll() {
    return this.prisma.ehrProvider.findMany({
      where: {
        isActive: true,
      },
    });
  }

  findOne(code: string) {
    return this.prisma.ehrProvider.findUnique({
      where: {
        code,
        isActive: true,
      },
    });
  }
}
