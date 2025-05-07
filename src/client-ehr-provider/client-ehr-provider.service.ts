import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientEhrProviderDto } from './dto/create-client-ehr-provider.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsService } from '../clients/clients.service';
import { EhrProvidersService } from 'src/ehr-providers/ehr-providers.service';
import { ClientIdParamDto } from 'src/shared/params/client-id.param.dto';
import { ClientEhrProvider } from '@prisma/client';

@Injectable()
export class ClientEhrProviderService {
  constructor(
    private prisma: PrismaService,
    private clientsService: ClientsService,
    private providersService: EhrProvidersService,
  ) {}

  async create(
    { clientId }: ClientIdParamDto,
    createClientEhrProviderDto: CreateClientEhrProviderDto[],
  ) {
    await this.validateClient(clientId);

    const existingProvidersMap = await this.getExistingProvidersMap(clientId);

    const results: ClientEhrProvider[] = [];
    for (const providerDto of createClientEhrProviderDto) {
      await this.validateProvider(providerDto.ehrProviderCode);

      const processedProvider = await this.processProvider(
        clientId,
        providerDto,
        existingProvidersMap,
      );

      results.push(processedProvider);
    }

    return results;
  }

  async findAll({ clientId }: ClientIdParamDto) {
    const providers = await this.prisma.clientEhrProvider.findMany({
      where: { clientId },
      include: {
        ehrProvider: true,
      },
      orderBy: {
        isDefault: 'asc',
      },
    });
    if (!providers || providers.length === 0) {
      throw new NotFoundException('No providers found for this client');
    }
    return providers;
  }

  findOne(id: string) {
    return this.prisma.clientEhrProvider.findUnique({
      where: { id },
      include: {
        client: true,
        ehrProvider: true,
      },
    });
  }

  private async validateClient(clientId: string) {
    const client = await this.clientsService.findOne(clientId);
    if (!client) {
      throw new BadRequestException('Client not found');
    }
    return !!client;
  }

  private async validateProvider(providerId: string) {
    const provider = await this.providersService.findOne(providerId);
    if (!provider) {
      throw new BadRequestException('Provider not found');
    }
    return !!provider;
  }

  private async getExistingProvidersMap(
    clientId: string,
  ): Promise<Map<string, string>> {
    const existingProviders = await this.prisma.clientEhrProvider.findMany({
      where: { clientId },
      select: { ehrProviderCode: true, id: true },
    });

    return new Map(
      existingProviders.map((provider) => [
        provider.ehrProviderCode,
        provider.id,
      ]),
    );
  }

  private async processProvider(
    clientId: string,
    providerDto: CreateClientEhrProviderDto,
    existingProvidersMap: Map<string, string>,
  ) {
    const { ehrProviderCode } = providerDto;

    if (existingProvidersMap.has(ehrProviderCode)) {
      return await this.updateExistingProvider(
        existingProvidersMap.get(ehrProviderCode)!,
        providerDto,
      );
    } else {
      return await this.createNewProvider(clientId, providerDto);
    }
  }

  private async updateExistingProvider(
    id: string,
    providerDto: CreateClientEhrProviderDto,
  ) {
    const { isDefault, credentials, settings } = providerDto;
    return this.prisma.clientEhrProvider.update({
      where: { id },
      data: {
        isDefault,
        credentials,
        settings,
        updatedAt: new Date(),
      },
    });
  }

  private async createNewProvider(
    clientId: string,
    providerDto: CreateClientEhrProviderDto,
  ) {
    return this.prisma.clientEhrProvider.create({
      data: {
        clientId,
        ...providerDto,
      },
    });
  }
}
