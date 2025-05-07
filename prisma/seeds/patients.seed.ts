import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

export async function seedPatients(prisma: PrismaClient, clientIds: string[]) {
  console.log('Seeding patients...');

  const patientIds: string[] = [];

  if (!clientIds || clientIds.length === 0) {
    console.log('No clients available. Skipping patient creation.');
    return patientIds;
  }

  const validClients = await prisma.client.findMany({
    where: {
      id: {
        in: clientIds,
      },
    },
    select: {
      id: true,
    },
  });

  const validClientIds = validClients.map((client) => client.id);

  if (validClientIds.length === 0) {
    console.log('No valid clients found. Skipping patient creation.');
    return patientIds;
  }

  for (const clientId of validClientIds) {
    for (let i = 1; i <= 5; i++) {
      try {
        const patient = await prisma.patient.create({
          data: {
            clientId,
            externalId: randomUUID(),
            basicInfo: {
              firstName: `Patient${i}`,
              lastName: `LastName${i}`,
              gender: i % 2 === 0 ? 'M' : 'F',
              dob: new Date(1980 + i, i, i + 10).toISOString(),
              address: `Main Street ${i}, City`,
              phone: `555-123-${1000 + i}`,
              email: `patient${i}@example.com`,
              emergencyContact: `Emergency Contact ${i}`,
              insuranceProvider: `Medical Insurance ${(i % 3) + 1}`,
              insurancePolicyNumber: `POL-${100000 + i}`,
              primaryCarePhysician: `Dr. Physician ${i}`,
              allergies: i % 2 === 0 ? 'Penicillin, Nuts' : 'None',
              currentMedications: i % 3 === 0 ? 'Aspirin, Ibuprofen' : 'None',
              medicalHistory: 'Patient medical history',
              socialHistory: 'Patient social history',
              familyHistory: 'Patient family history',
            },
            preferredLanguage: 'en',
            isActive: true,
          },
        });

        patientIds.push(patient.id);
      } catch (error) {
        console.error(`Error creating patient for client ${clientId}:`, error);
      }
    }
  }

  console.log(`Created ${patientIds.length} patients`);
  return patientIds;
}
