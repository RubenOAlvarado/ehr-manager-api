import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientEhrProviderDto } from './dto/create-client-ehr-provider.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EhrProvidersService } from 'src/ehr-providers/ehr-providers.service';
import { ClientIdParamDto } from 'src/shared/params/client-id.param.dto';
import { UpdateClientEhrProviderDto } from './dto/update-client-ehr-provider.dto';

@Injectable()
export class ClientEhrProviderService {
  constructor(
    private prisma: PrismaService,
    private providersService: EhrProvidersService,
  ) {}

  async create(
    { clientId }: ClientIdParamDto,
    createClientEhrProviderDto: CreateClientEhrProviderDto[],
  ) {
    const existingProvidersMap = await this.getExistingProvidersMap(clientId);

    for (const providerDto of createClientEhrProviderDto) {
      await this.validateProvider(providerDto.ehrProviderCode);

      await this.processProvider(clientId, providerDto, existingProvidersMap);
    }
  }

  async updateClientEhrProviders(
    { clientId }: ClientIdParamDto,
    updateClientEhrProviderDto: UpdateClientEhrProviderDto[],
  ) {
    const existingProvidersMap = await this.getExistingProvidersMap(clientId);
    const incomingProvidersCode = updateClientEhrProviderDto.map(
      (provider) => provider.ehrProviderCode ?? '',
    );
    await this.deleteMissingProviders(
      clientId,
      existingProvidersMap,
      incomingProvidersCode,
    );
    for (const providerDto of updateClientEhrProviderDto) {
      if (providerDto.ehrProviderCode) {
        await this.validateProvider(providerDto.ehrProviderCode);
        await this.processProvider(
          clientId,
          providerDto as CreateClientEhrProviderDto,
          existingProvidersMap,
        );
      }
    }
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

  findOne(id: string, withRelations: boolean = false) {
    return this.prisma.clientEhrProvider.findUnique({
      where: { id },
      include: withRelations
        ? {
            client: true,
            ehrProvider: true,
          }
        : undefined,
    });
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

  private async deleteMissingProviders(
    clientId: string,
    existingProvidersMap: Map<string, string>,
    incomingProvidersCode: string[],
  ) {
    if (!incomingProvidersCode) return;

    const codesToDelete = [...existingProvidersMap.keys()].filter(
      (key) => !incomingProvidersCode.includes(key),
    );
    if (codesToDelete.length === 0) return;
    const toDelete = codesToDelete.map(
      (code) => existingProvidersMap.get(code)!,
    );
    await this.prisma.$transaction(async (prisma) => {
      await prisma.ehrSyncLog.deleteMany({
        where: {
          clientEhrProviderId: {
            in: toDelete,
          },
        },
      });
      await prisma.clientEhrProvider.deleteMany({
        where: {
          id: {
            in: toDelete,
          },
        },
      });
    });
  }
}
