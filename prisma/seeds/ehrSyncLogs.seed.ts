import { PrismaClient, SyncStatus } from '@prisma/client';

export async function seedEhrSyncLogs(
  prisma: PrismaClient,
  patientIds: string[],
): Promise<void> {
  console.log('Seeding EHR sync logs...');

  const statuses: SyncStatus[] = [
    SyncStatus.PENDING,
    SyncStatus.IN_PROGRESS,
    SyncStatus.COMPLETED,
    SyncStatus.FAILED,
    SyncStatus.RETRY_SCHEDULED,
  ];

  for (const patientId of patientIds) {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: { client: true },
    });

    if (!patient) continue;

    const clientEhrProviders = await prisma.clientEhrProvider.findMany({
      where: { clientId: patient.clientId },
    });

    if (!clientEhrProviders.length) continue;

    const logsCount = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < logsCount; i++) {
      const clientEhrProvider =
        clientEhrProviders[
          Math.floor(Math.random() * clientEhrProviders.length)
        ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      await prisma.ehrSyncLog.create({
        data: {
          patientId,
          clientEhrProviderId: clientEhrProvider.id,
          syncStatus: status,
          requestPayload: {
            patient: {
              id: patientId,
              allergies: ['PENICILLIN', 'POLLEN'],
              medications: ['ASPIRIN', 'IBUPROFEN'],
            },
          },
          responsePayload:
            status === SyncStatus.COMPLETED
              ? {
                  status: 'COMPLETED',
                  timestamp: new Date().toISOString(),
                  recordId: `REC-${Math.floor(Math.random() * 1000000)}`,
                }
              : undefined,
          errorDetails:
            status === SyncStatus.FAILED
              ? {
                  message: 'Connection timeout',
                  code: 'ERR_TIMEOUT',
                  timestamp: new Date().toISOString(),
                }
              : undefined,
          retryCount:
            status === SyncStatus.RETRY_SCHEDULED
              ? Math.floor(Math.random() * 3) + 1
              : 0,
          nextRetryAt:
            status === SyncStatus.RETRY_SCHEDULED
              ? new Date(
                  Date.now() + 3600000 * (Math.floor(Math.random() * 24) + 1),
                )
              : null,
        },
      });
    }
  }

  console.log('EHR sync logs seeded successfully!');
}
