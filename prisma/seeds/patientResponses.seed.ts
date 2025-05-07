import { PrismaClient } from '@prisma/client';

export async function seedPatientResponses(
  prisma: PrismaClient,
  patientIds: string[],
) {
  console.log('Seeding patient responses...');

  const baseQuestions = await prisma.baseQuestion.findMany();

  if (baseQuestions.length === 0) {
    console.log('No base questions found. Skipping patient responses.');
    return;
  }

  const responses: any[] = [];

  for (const patientId of patientIds) {
    const questionsToAnswer = baseQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(5, baseQuestions.length));

    const sessionId = `session-${Date.now()}-${patientId.substring(0, 4)}`;

    for (const question of questionsToAnswer) {
      const response = await prisma.patientResponse.create({
        data: {
          patientId,
          baseQuestionId: question.id,
          response: generateRandomResponse(question.questionType),
          responseMeta: {},
          sessionId,
        },
      });

      responses.push(response);
    }
  }

  console.log(`Created ${responses.length} patient responses`);
}

function generateRandomResponse(questionType: string): string {
  switch (questionType) {
    case 'TEXT':
      return 'This is a random response for a text question';
    case 'NUMBER':
      return Math.floor(Math.random() * 100).toString();
    case 'BOOLEAN':
      return Math.random() > 0.5 ? 'true' : 'false';
    case 'DATE': {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 365));
      return date.toISOString().split('T')[0];
    }
    case 'MULTIPLE_CHOICE': {
      const options = ['Option A', 'Option B', 'Option C', 'Option D'];
      return options[Math.floor(Math.random() * options.length)];
    }
    default:
      return 'Default response';
  }
}
