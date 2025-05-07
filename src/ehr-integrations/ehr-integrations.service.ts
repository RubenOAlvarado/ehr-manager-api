import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Patient, PatientResponse } from '@prisma/client';
import { ClientEhrProviderService } from 'src/client-ehr-provider/client-ehr-provider.service';
import { EhrSyncLogsService } from './ehr-sync-log.service';

@Injectable()
export class EhrIntegrationsService {
  constructor(
    private clientEhrProvidersService: ClientEhrProviderService,
    private syncService: EhrSyncLogsService,
  ) {}
  private readonly logger = new Logger(EhrIntegrationsService.name);

  async syncPatientResponses(
    patient: Patient,
    patientResponses: PatientResponse[],
  ) {
    this.logger.log(`Syncing patient responses for patient ${patient.id}`);
    try {
      const clientProviders = await this.clientEhrProvidersService.findAll({
        clientId: patient.clientId,
      });
      if (clientProviders.length === 0) {
        this.logger.error(
          `No client providers found for client ${patient.clientId}`,
        );
        throw new InternalServerErrorException(
          `No client providers found for client ${patient.clientId}`,
        );
      }

      this.logger.log(
        `Found ${clientProviders.length} client providers for client ${patient.clientId}`,
      );
      for (const clientProvider of clientProviders) {
        this.logger.log(
          `Syncing patient responses for patient ${patient.id} with client provider ${clientProvider.id}`,
        );
        const { ehrProvider } = clientProvider;
        const syncResult = await this.syncService.syncWithProvider(
          patient,
          patientResponses,
          clientProvider,
          ehrProvider,
        );
        this.logger.log(
          `Sync result for patient ${patient.id} with client provider ${clientProvider.id}: ${JSON.stringify(
            syncResult,
          )}`,
        );
      }
      this.logger.log(
        `Successfully synced patient responses for patient ${patient.id} with client providers`,
      );
    } catch (error) {
      this.logger.error(
        `Error syncing patient responses for patient ${patient.id}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }
}
