import { PrismaClient } from '@prisma/client';

export async function seedClientEhrProviders(
  prisma: PrismaClient,
  clientIds: string[],
): Promise<string[]> {
  console.log('Seeding client EHR providers...');

  const ehrProviders = await prisma.ehrProvider.findMany();

  const clientEhrProviderIds: string[] = [];

  for (const clientId of clientIds) {
    for (const [index, provider] of ehrProviders.entries()) {
      const clientEhrProvider = await prisma.clientEhrProvider.create({
        data: {
          clientId,
          ehrProviderCode: provider.code,
          isDefault: index === 0,
          credentials: {
            apiKey: `test_api_key_${clientId.substring(0, 5)}_${provider.code}`,
            secret: `test_secret_${clientId.substring(0, 5)}_${provider.code}`,
          },
          settings: {
            endpointOverrides: {},
            syncFrequency: 'daily',
            retryAttempts: 3,
          },
        },
      });
      clientEhrProviderIds.push(clientEhrProvider.id);
    }
  }

  console.log(`Seeded ${clientEhrProviderIds.length} client EHR providers`);
  return clientEhrProviderIds;
}
