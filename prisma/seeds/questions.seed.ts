/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PrismaClient } from '@prisma/client';

export async function seedQuestions(prisma: PrismaClient) {
  console.log('Seeding questions...');

  const questionSets = await prisma.questionSet.findMany();

  const baseQuestions = await prisma.baseQuestion.findMany();

  const languages = await prisma.language.findMany();

  if (!questionSets.length || !baseQuestions.length || !languages.length) {
    console.log(
      'No question sets, base questions or languages found. Skipping questions seeding.',
    );
    return [];
  }

  for (const questionSet of questionSets) {
    const shuffled = [...baseQuestions].sort(() => 0.5 - Math.random());
    const selectedBaseQuestions = shuffled.slice(
      0,
      Math.floor(Math.random() * 5) + 5,
    );

    for (const baseQuestion of selectedBaseQuestions) {
      for (const language of languages) {
        const questionText = generarTextoPregunta(
          baseQuestion.internalCode,
          language.code,
        );

        try {
          await prisma.question.create({
            data: {
              baseQuestionId: baseQuestion.id,
              questionSetId: questionSet.id,
              languageCode: language.code,
              questionText: questionText,
            },
          });
        } catch (error) {
          console.log(`Error creating question: ${error}`);
        }
      }
    }
  }

  console.log(`Seeding questions completed.`);
}

function generarTextoPregunta(
  internalCode: string,
  languageCode: string,
): string {
  const preguntasEs = {
    PATIENT_NAME: '¿Cuál es su nombre completo?',
    PATIENT_GENDER: '¿Cuál es su género?',
    PATIENT_DOB: '¿Cuál es su fecha de nacimiento?',
    PATIENT_ADDRESS: '¿Cuál es su dirección actual?',
    PATIENT_PHONE: '¿Cuál es su número de teléfono?',
    PATIENT_EMAIL: '¿Cuál es su correo electrónico?',
    PATIENT_EMERGENCY_CONTACT:
      '¿A quién debemos contactar en caso de emergencia?',
    PATIENT_INSURANCE_PROVIDER: '¿Cuál es su proveedor de seguro médico?',
    PATIENT_INSURANCE_POLICY_NUMBER: '¿Cuál es su número de póliza de seguro?',
    PATIENT_PRIMARY_CARE_PHYSICIAN: '¿Quién es su médico de atención primaria?',
    PATIENT_ALLERGIES: '¿Tiene alguna alergia? Por favor, enumere todas',
    PATIENT_CURRENT_MEDICATIONS: '¿Qué medicamentos está tomando actualmente?',
    PATIENT_MEDICAL_HISTORY: 'Por favor, describa su historial médico',
    PATIENT_SOCIAL_HISTORY:
      'Por favor, proporcione información sobre su historial social',
    PATIENT_FAMILY_HISTORY:
      'Por favor, describa el historial médico familiar relevante',
  };

  const preguntasEn = {
    PATIENT_NAME: 'What is your full name?',
    PATIENT_GENDER: 'What is your gender?',
    PATIENT_DOB: 'What is your date of birth?',
    PATIENT_ADDRESS: 'What is your current address?',
    PATIENT_PHONE: 'What is your phone number?',
    PATIENT_EMAIL: 'What is your email address?',
    PATIENT_EMERGENCY_CONTACT: 'Who should we contact in case of emergency?',
    PATIENT_INSURANCE_PROVIDER: 'What is your insurance provider?',
    PATIENT_INSURANCE_POLICY_NUMBER: 'What is your insurance policy number?',
    PATIENT_PRIMARY_CARE_PHYSICIAN: 'Who is your primary care physician?',
    PATIENT_ALLERGIES: 'Do you have any allergies? Please list all',
    PATIENT_CURRENT_MEDICATIONS: 'What medications are you currently taking?',
    PATIENT_MEDICAL_HISTORY: 'Please describe your medical history',
    PATIENT_SOCIAL_HISTORY:
      'Please provide information about your social history',
    PATIENT_FAMILY_HISTORY: 'Please describe relevant family medical history',
  };

  const preguntas = languageCode === 'es' ? preguntasEs : preguntasEn;

  return (
    preguntas[internalCode] ||
    (languageCode === 'es'
      ? `Pregunta sobre ${internalCode.toLowerCase().replace('_', ' ')}`
      : `Question about ${internalCode.toLowerCase().replace('_', ' ')}`)
  );
}
