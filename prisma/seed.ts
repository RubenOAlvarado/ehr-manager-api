/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
import { seedLanguages } from './seeds/languages.seed';
import { seedEhrProviders } from './seeds/ehrProviders.seed';
import { seedClients } from './seeds/clients.seed';
import { seedBaseQuestions } from './seeds/baseQuestions.seed';
import { seedEhrMappings } from './seeds/ehrMappings.seed';
import { seedQuestionSets } from './seeds/questionSets.seed';
import { seedPatients } from './seeds/patients.seed';
import { seedPatientResponses } from './seeds/patientResponses.seed';
import { seedEhrSyncLogs } from './seeds/ehrSyncLogs.seed';
import { seedBulkOperations } from './seeds/bulkOperations.seed';
import { seedAuditLogs } from './seeds/auditLogs.seed';
import { seedEhrMappingsCache } from './seeds/ehrMappingsCache.seed';
import { seedQuestions } from './seeds/questions.seed';
import { seedClientEhrProviders } from './seeds/clientEhrProviders.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  await seedLanguages(prisma);
  await seedEhrProviders(prisma);
  const clientsIds = await seedClients(prisma);
  await seedBaseQuestions(prisma);
  await seedEhrMappings(prisma);
  await seedQuestionSets(prisma, clientsIds);
  const patientIds = await seedPatients(prisma, clientsIds);
  await seedPatientResponses(prisma, patientIds);
  await seedClientEhrProviders(prisma, clientsIds);
  await seedEhrSyncLogs(prisma, patientIds);
  await seedBulkOperations(prisma, clientsIds);
  await seedAuditLogs(prisma);
  await seedEhrMappingsCache(prisma, clientsIds);
  await seedQuestions(prisma);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1); // Exit with an error code if an exception occurs during the execution of the main() function or any of its asynchronous operations. This is a common practice in Node.js applications to handle unexpected errors and ensure that the application exits gracefully with an error code when something goes wrong.
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
