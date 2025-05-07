import { PrismaClient } from '@prisma/client';

export async function seedQuestionSets(
  prisma: PrismaClient,
  clientIds: string[],
) {
  console.log('Seeding question sets...');

  const questionSets = [
    {
      clientId: clientIds[0],
      name: 'Basic Patient Information',
      description: 'Essential patient demographic and contact information',
      version: 1,
    },
    {
      clientId: clientIds[0],
      name: 'Medical History',
      description: 'Comprehensive medical history questionnaire',
      version: 1,
    },
    {
      clientId: clientIds[1],
      name: 'Patient Intake Form',
      description: 'Initial patient registration form',
      version: 2,
    },
    {
      clientId: clientIds[2],
      name: 'Pediatric Assessment',
      description: 'Specialized assessment for pediatric patients',
      version: 1,
    },
  ];

  const questionSetIds: string[] = [];

  for (const set of questionSets) {
    const result = await prisma.questionSet.create({
      data: set,
    });
    questionSetIds.push(result.id);
  }

  console.log('Question sets seeded successfully!');
  return questionSetIds;
}
