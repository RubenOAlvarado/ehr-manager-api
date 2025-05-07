import { SyncStatus } from '@prisma/client';

export interface EhrSyncResult {
  status: SyncStatus;
  responsePayload?: any;
  errorDetails?: any;
}
