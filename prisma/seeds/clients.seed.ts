/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

export async function seedClients(prisma: PrismaClient) {
  console.log('Seeding clients...');

  const clients = [
    {
      name: 'General Hospital',
      externalId: 'GH001',
      defaultLanguage: 'en',
      metadata: {
        address: '123 Medical Center Blvd, Springfield, IL',
        contactPerson: 'Dr. Jane Smith',
        contactEmail: 'jsmith@generalhospital.org',
        subscriptionTier: 'premium',
      },
    },
    {
      name: 'City Medical Center',
      externalId: 'CMC002',
      defaultLanguage: 'en',
      metadata: {
        address: '456 Healthcare Ave, Metropolis, NY',
        contactPerson: 'Dr. Robert Johnson',
        contactEmail: 'rjohnson@citymedical.org',
        subscriptionTier: 'standard',
      },
    },
    {
      name: 'Sunshine Pediatrics',
      externalId: 'SP003',
      defaultLanguage: 'es',
      metadata: {
        address: '789 Children Way, Miami, FL',
        contactPerson: 'Dr. Maria Rodriguez',
        contactEmail: 'mrodriguez@sunshinepeds.org',
        subscriptionTier: 'premium',
      },
    },
  ];

  const clientsIds: string[] = [];

  for (const client of clients) {
    const result = await prisma.client.upsert({
      where: {
        id: randomUUID(),
      },
      update: {},
      create: {
        ...client,
        metadata: client.metadata as any,
      },
    });
    clientsIds.push(result.id);
  }

  console.log('Clients seeded successfully!');
  return clientsIds;
}
