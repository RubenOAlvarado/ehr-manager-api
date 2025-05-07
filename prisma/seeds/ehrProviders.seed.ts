import { PrismaClient } from '@prisma/client';

export async function seedEhrProviders(prisma: PrismaClient) {
  console.log('Seeding EHR providers...');

  const providers = [
    {
      code: 'ATHENA',
      name: 'Athena Health',
      baseUrl: 'https://api.athenahealth.com/v1',
      authConfig: {
        authType: 'oauth2',
        clientId: 'example_client_id',
        clientSecret: 'example_client_secret',
        tokenUrl: 'https://api.athenahealth.com/oauth2/v1/token',
      },
    },
    {
      code: 'ALLSCRIPTS',
      name: 'Allscripts',
      baseUrl: 'https://api.allscripts.com/v1',
      authConfig: {
        authType: 'apikey',
        apiKey: 'example_api_key',
        appName: 'example_app_name',
      },
    },
    {
      code: 'EPIC',
      name: 'Epic Systems',
      baseUrl: 'https://api.epic.com/v1',
      authConfig: {
        authType: 'oauth2',
        clientId: 'example_client_id',
        clientSecret: 'example_client_secret',
        tokenUrl: 'https://api.epic.com/oauth2/token',
      },
    },
  ];

  for (const provider of providers) {
    await prisma.ehrProvider.upsert({
      where: { code: provider.code },
      update: {},
      create: {
        ...provider,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        authConfig: provider.authConfig as any,
      },
    });
  }

  console.log('EHR providers seeded successfully!');
}
