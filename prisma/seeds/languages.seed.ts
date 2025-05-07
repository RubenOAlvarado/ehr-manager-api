import { PrismaClient } from '@prisma/client';

export async function seedLanguages(prisma: PrismaClient) {
  console.log('Seeding languages...');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'pt', name: 'Portuguese' },
  ];

  for (const language of languages) {
    await prisma.language.upsert({
      where: { code: language.code },
      update: {},
      create: language,
    });
  }

  console.log('Languages seeded successfully!');
}
