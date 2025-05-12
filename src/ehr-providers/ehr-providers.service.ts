import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEhrProviderDto } from './dto/create-ehr-provider.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProviderCodeParamDto } from './dto/provider-code.param.dto';

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

  async update(
    { code }: ProviderCodeParamDto,
    updateEhrProviderDto: CreateEhrProviderDto,
  ) {
    const existingProvider = await this.findOne(code);
    if (!existingProvider) {
      throw new NotFoundException('Provider not found');
    }
    return this.prisma.ehrProvider.update({
      where: {
        code,
        isActive: true,
      },
      data: {
        ...updateEhrProviderDto,
      },
    });
  }
}
