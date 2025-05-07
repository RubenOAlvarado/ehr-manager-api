/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import {
  ClientEhrProvider,
  EhrProvider,
  Patient,
  PatientResponse,
  SyncStatus,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EhrMappingsService } from './ehr-mappings.service';
import { ApiClientService } from 'src/api-client/api-client.service';

@Injectable()
export class EhrSyncLogsService {
  constructor(
    private prisma: PrismaService,
    private mappingService: EhrMappingsService,
    private apiClientService: ApiClientService,
  ) {}

  async syncWithProvider(
    patient: Patient,
    responses: PatientResponse[],
    clientEhrProvider: ClientEhrProvider,
    ehrProvider: EhrProvider,
  ) {
    try {
      const { id } = await this.prisma.ehrSyncLog.create({
        data: {
          patientId: patient.id,
          clientEhrProviderId: clientEhrProvider.id,
          requestPayload: responses,
          syncStatus: SyncStatus.IN_PROGRESS,
        },
      });

      const transformedData = await this.mappingService.transformResponses(
        clientEhrProvider.ehrProviderCode,
        responses,
      );
      const requestPayload = {
        patientId: patient.externalId,
        patientInfo: patient.basicInfo,
        data: transformedData,
      };
      const responsePayload = await this.apiClientService.sendDataToEhr(
        requestPayload,
        ehrProvider.authConfig
          ? JSON.parse(JSON.stringify(ehrProvider.authConfig))
          : null,
        clientEhrProvider.credentials
          ? JSON.parse(JSON.stringify(clientEhrProvider.credentials))
          : null,
      );

      await this.updateSyncLog(
        id,
        SyncStatus.COMPLETED,
        requestPayload,
        responsePayload as Record<string, any>,
        null,
        clientEhrProvider.id,
        patient.id,
      );

      return {
        providerId: clientEhrProvider.ehrProviderCode,
        status: SyncStatus.COMPLETED,
        response: responsePayload,
      };
    } catch (error) {
      const errorDetails = {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : {},
        code:
          error instanceof Error && 'code' in error
            ? error.code
            : 'UNKNOWN_ERROR',
      };
      if (clientEhrProvider) {
        await this.updateSyncLog(
          null,
          SyncStatus.FAILED,
          null,
          null,
          errorDetails,
          patient.id,
          clientEhrProvider.id,
        );
      }

      return {
        providerId: clientEhrProvider.ehrProviderCode,
        status: SyncStatus.FAILED,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async updateSyncLog(
    id: string | null,
    status: SyncStatus,
    requestPayload: Record<string, any> | null,
    responsePayload: Record<string, any> | null,
    errorDetails: Record<string, any> | null,
    clientEhrProviderId: string,
    patientId?: string,
  ) {
    const data = {
      syncStatus: status,
      requestPayload: {},
      responsePayload: {},
      errorDetails: {},
    };
    if (requestPayload !== null) data.requestPayload = requestPayload;
    if (responsePayload !== null) data.responsePayload = responsePayload;
    if (errorDetails !== null) data.errorDetails = errorDetails;

    if (id) {
      return await this.prisma.ehrSyncLog.update({
        where: { id },
        data,
      });
    } else if (patientId && clientEhrProviderId) {
      return await this.prisma.ehrSyncLog.create({
        data: {
          patientId,
          clientEhrProviderId,
          ...data,
        },
      });
    }
  }
}
