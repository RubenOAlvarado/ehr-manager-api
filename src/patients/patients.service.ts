import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsService } from 'src/clients/clients.service';
import { ClientIdParamDto } from '../shared/params/client-id.param.dto';

@Injectable()
export class PatientsService {
  constructor(
    private prisma: PrismaService,
    private clientsService: ClientsService,
  ) {}

  async create(
    createPatientDto: CreatePatientDto,
    { clientId }: ClientIdParamDto,
  ) {
    const client = await this.clientsService.findOne(clientId);
    if (!client) {
      throw new BadRequestException('Invalid clientId');
    }
    return this.prisma.patient.create({
      data: {
        ...createPatientDto,
        clientId,
        isActive: true,
      },
    });
  }

  async findOne(id: string, withClient: boolean = false) {
    return this.prisma.patient.findUnique({
      where: { id },
      include: {
        client: withClient,
      },
    });
  }
}
