import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientIdParamDto } from 'src/shared/params/client-id.param.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEhrProviderService } from 'src/client-ehr-provider/client-ehr-provider.service';

@Injectable()
export class ClientsService {
  constructor(
    private prisma: PrismaService,
    private clientEhrProviderService: ClientEhrProviderService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const { ehrProviders, ...clientData } = createClientDto;
    const newClient = await this.prisma.client.create({
      data: {
        ...clientData,
        metadata: {},
        isActive: true,
      },
    });
    if (ehrProviders) {
      await this.clientEhrProviderService.create(
        { clientId: newClient.id },
        ehrProviders,
      );
    }

    return newClient;
  }

  async update(
    { clientId }: ClientIdParamDto,
    updateClientDto: UpdateClientDto,
  ) {
    const { ehrProviders, ...clientData } = updateClientDto;
    const existingClient = await this.findOne(clientId);
    if (!existingClient) {
      throw new NotFoundException('Client not found');
    }
    await this.prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        ...clientData,
      },
    });
    if (ehrProviders) {
      await this.clientEhrProviderService.updateClientEhrProviders(
        { clientId },
        ehrProviders,
      );
    }
  }

  findAll() {
    return this.prisma.client.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      include: {
        ehrProviders: true,
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
