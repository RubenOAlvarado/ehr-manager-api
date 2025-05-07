/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';

export async function seedEhrMappingsCache(
  prisma: PrismaClient,
  clientIds: string[],
) {
  console.log('Seeding EHR mappings cache...');

  const ehrProviders = await prisma.ehrProvider.findMany();

  const baseQuestions = await prisma.baseQuestion.findMany({
    take: 10,
  });

  if (ehrProviders.length === 0 || baseQuestions.length === 0) {
    console.log(
      'No EHR providers or base questions found. Skipping mappings cache.',
    );
    return;
  }

  const cacheEntries: any[] = [];

  for (const clientId of clientIds) {
    for (const ehrProvider of ehrProviders) {
      for (const baseQuestion of baseQuestions.slice(0, 3)) {
        const mappingData = generateMappingData(
          ehrProvider.code,
          baseQuestion.internalCode,
        );

        const expiresAt = new Date();
        expiresAt.setDate(
          expiresAt.getDate() + Math.floor(Math.random() * 7) + 1,
        );

        const cacheEntry = await prisma.ehrMappingsCache.create({
          data: {
            clientId,
            ehrProviderCode: ehrProvider.code,
            baseQuestionId: baseQuestion.id,
            mappingData,
            expiresAt,
          },
        });

        cacheEntries.push(cacheEntry);
      }
    }
  }

  console.log(`Created ${cacheEntries.length} EHR mapping cache entries`);
}

function generateMappingData(providerCode: string, questionCode: string): any {
  if (providerCode === 'ATHENA') {
    return {
      fieldPath: `patient.${getAthenaFieldName(questionCode)}`,
      dataType: 'string',
      apiEndpoint: '/api/v1/patients/data',
      transformations: [
        { type: 'format', params: { format: 'uppercase' } },
        { type: 'validate', params: { required: true } },
      ],
      lastValidated: new Date().toISOString(),
    };
  } else if (providerCode === 'ALLSCRIPTS') {
    return {
      fieldPath: `patient.${getAllscriptsFieldName(questionCode)}`,
      dataType: 'string',
      apiEndpoint: '/api/2.0/patients/clinical',
      transformations: [
        { type: 'trim', params: {} },
        { type: 'sanitize', params: { allowHtml: false } },
      ],
      lastValidated: new Date().toISOString(),
    };
  } else {
    return {
      fieldPath: `data.${questionCode.toLowerCase()}`,
      dataType: 'string',
      apiEndpoint: '/api/generic',
      transformations: [],
      lastValidated: new Date().toISOString(),
    };
  }
}

function getAthenaFieldName(questionCode: string): string {
  const mappings: Record<string, string> = {
    NAME: 'PATIENT_IDENT_NAME',
    GENDER: 'GENDER_OF_PATIENT',
    DOB: 'DATE_OF_BIRTH_PATIENT',
    ADDRESS: 'PATIENT_LOCATION_ADDRESS',
    PHONE: 'TELEPHONE_NUMBER_PATIENT',
    EMAIL: 'PATIENT_EMAIL_ID',
    EMERGENCY_CONTACT: 'EMERGENCY_CONTACT_PATIENT',
    INSURANCE: 'INSURANCE_PROVIDER_PATIENT',
    POLICY_NUMBER: 'POLICY_NUMBER_INSURANCE_PATIENT',
    PRIMARY_PHYSICIAN: 'PRIMARY_CARE_DOCTOR_PATIENT',
    ALLERGIES: 'ALLERGIES_PATIENT',
    MEDICATIONS: 'PATIENT_MEDICATIONS_CURRENT',
    MEDICAL_HISTORY: 'HISTORY_MEDICAL_PATIENT',
    SOCIAL_HISTORY: 'HISTORY_SOCIAL_PATIENT',
    FAMILY_HISTORY: 'HISTORY_FAMILY_PATIENT',
  };

  return mappings[questionCode] || 'UNKNOWN_FIELD';
}

function getAllscriptsFieldName(questionCode: string): string {
  const mappings: Record<string, string> = {
    NAME: 'NAME_OF_PAT',
    GENDER: 'GENDER_PAT',
    DOB: 'BIRTHDATE_OF_PAT',
    ADDRESS: 'ADDRESS_PAT',
    PHONE: 'PHONE_NUMBER_PAT',
    EMAIL: 'EMAIL_ID_PAT',
    EMERGENCY_CONTACT: 'EMERGENCY_CONTACT_PAT',
    INSURANCE: 'PROVIDER_INSURANCE_PAT',
    POLICY_NUMBER: 'POLICY_NUM_INSURANCE_PAT',
    PRIMARY_PHYSICIAN: 'PRIMARY_CARE_DOC_PAT',
    ALLERGIES: 'ALLERGIES_PAT',
    MEDICATIONS: 'CURRENT_MEDS_PAT',
    MEDICAL_HISTORY: 'HISTORY_MEDICAL_PAT',
    SOCIAL_HISTORY: 'SOCIAL_HISTORY_PAT',
    FAMILY_HISTORY: 'FAMILY_HISTORY_PAT',
  };

  return mappings[questionCode] || 'UNKNOWN_FIELD';
}
