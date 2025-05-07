import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        ...createClientDto,
        metadata: {},
        isActive: true,
      },
    });
  }

  findAll() {
    return this.prisma.client.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.client.findUnique({
      where: {
        id,
      },
    });
  }
}
