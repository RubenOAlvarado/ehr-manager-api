import { PrismaClient, OperationType, SyncStatus } from '@prisma/client';

export async function seedBulkOperations(
  prisma: PrismaClient,
  clientIds: string[],
) {
  console.log('Seeding bulk operations...');

  const operations: any[] = [];

  const operationTypes: OperationType[] = [
    'IMPORT_PATIENTS',
    'SYNC_EHR',
    'EXPORT_RESPONSES',
  ];

  const statuses: SyncStatus[] = [
    'COMPLETED',
    'FAILED',
    'PENDING',
    'IN_PROGRESS',
  ];

  for (const clientId of clientIds) {
    const numOperations = 2 + Math.floor(Math.random() * 2);

    for (let i = 0; i < numOperations; i++) {
      const operationType =
        operationTypes[Math.floor(Math.random() * operationTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      let parameters = {};
      switch (operationType) {
        case 'EXPORT_RESPONSES':
          parameters = {
            format: ['CSV', 'JSON', 'XML'][Math.floor(Math.random() * 3)],
            dateRange: {
              start: new Date(2023, 0, 1).toISOString(),
              end: new Date().toISOString(),
            },
            includeDeleted: Math.random() > 0.5,
          };
          break;
        case 'IMPORT_PATIENTS':
          parameters = {
            source: ['EHR_SYSTEM', 'CSV_UPLOAD', 'API'][
              Math.floor(Math.random() * 3)
            ],
            fileUrl: `https://example.com/imports/file_${i}.csv`,
            mappingId: `map-${Math.floor(Math.random() * 1000)}`,
          };
          break;
        case 'SYNC_EHR':
          parameters = {
            ehrProvider: ['ATHENA', 'ALLSCRIPTS'][
              Math.floor(Math.random() * 2)
            ],
            syncAll: Math.random() > 0.7,
            patientIds: Array.from(
              { length: 3 },
              () => `pat-${Math.floor(Math.random() * 1000)}`,
            ),
          };
          break;
      }

      const totalCount = Math.floor(Math.random() * 100) + 10;
      const processedCount =
        status === 'PENDING'
          ? 0
          : status === 'IN_PROGRESS'
            ? Math.floor(totalCount * Math.random())
            : status === 'COMPLETED'
              ? totalCount
              : Math.floor(totalCount * 0.7); // FAILED

      const completedAt =
        status === 'COMPLETED' || status === 'FAILED'
          ? new Date(
              Date.now() - Math.floor(Math.random() * 7 * 24 * 3600 * 1000),
            )
          : null;

      const errorLog =
        status === 'FAILED'
          ? 'Error during processing: Lost connection to EHR server'
          : null;

      const operation = await prisma.bulkOperation.create({
        data: {
          clientId,
          operationType,
          status,
          parameters,
          createdBy: `user_${Math.floor(Math.random() * 5) + 1}@example.com`,
          processedCount,
          totalCount,
          errorLog,
          completedAt,
        },
      });

      operations.push(operation);
    }
  }

  console.log(`Created ${operations.length} bulk operations`);
}
