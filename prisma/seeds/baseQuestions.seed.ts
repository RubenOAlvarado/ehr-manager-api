/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient, QuestionType, ResponseDataType } from '@prisma/client';

export async function seedBaseQuestions(prisma: PrismaClient) {
  console.log('Seeding base questions...');

  const baseQuestions = [
    {
      internalCode: 'PATIENT_NAME',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: true,
        minLength: 2,
        maxLength: 100,
      },
      metadata: {
        category: 'demographics',
        importance: 'high',
      },
    },
    {
      internalCode: 'PATIENT_GENDER',
      questionType: QuestionType.MULTIPLE_CHOICE,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: true,
        options: ['male', 'female', 'other', 'prefer_not_to_say'],
      },
      metadata: {
        category: 'demographics',
        importance: 'high',
      },
    },
    {
      internalCode: 'PATIENT_DOB',
      questionType: QuestionType.DATE,
      responseDataType: ResponseDataType.DATE,
      validationRules: {
        required: true,
        minDate: '1900-01-01',
        maxDate: 'today',
      },
      metadata: {
        category: 'demographics',
        importance: 'high',
      },
    },
    {
      internalCode: 'PATIENT_ADDRESS',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: true,
        minLength: 5,
        maxLength: 200,
      },
      metadata: {
        category: 'demographics',
        importance: 'medium',
      },
    },
    {
      internalCode: 'PATIENT_PHONE',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: true,
        pattern: '^[0-9\\-\\+\\(\\)\\s]+$',
        minLength: 10,
      },
      metadata: {
        category: 'demographics',
        importance: 'medium',
      },
    },
    {
      internalCode: 'PATIENT_EMAIL',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: false,
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      },
      metadata: {
        category: 'demographics',
        importance: 'low',
      },
    },
    {
      internalCode: 'PATIENT_EMERGENCY_CONTACT',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: false,
        minLength: 5,
        maxLength: 200,
      },
      metadata: {
        category: 'emergency',
        importance: 'high',
      },
    },
    {
      internalCode: 'PATIENT_INSURANCE_PROVIDER',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: false,
        minLength: 2,
        maxLength: 100,
      },
      metadata: {
        category: 'insurance',
        importance: 'medium',
      },
    },
    {
      internalCode: 'PATIENT_INSURANCE_POLICY_NUMBER',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: false,
        minLength: 5,
        maxLength: 50,
      },
      metadata: {
        category: 'insurance',
        importance: 'medium',
      },
    },
    {
      internalCode: 'PATIENT_PRIMARY_CARE_PHYSICIAN',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: false,
        minLength: 2,
        maxLength: 100,
      },
      metadata: {
        category: 'medical',
        importance: 'medium',
      },
    },
    {
      internalCode: 'PATIENT_ALLERGIES',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: false,
        maxLength: 500,
      },
      metadata: {
        category: 'medical',
        importance: 'high',
      },
    },
    {
      internalCode: 'PATIENT_CURRENT_MEDICATIONS',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: false,
        maxLength: 1000,
      },
      metadata: {
        category: 'medical',
        importance: 'high',
      },
    },
    {
      internalCode: 'PATIENT_MEDICAL_HISTORY',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: false,
        maxLength: 2000,
      },
      metadata: {
        category: 'medical',
        importance: 'high',
      },
    },
    {
      internalCode: 'PATIENT_SOCIAL_HISTORY',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: false,
        maxLength: 1000,
      },
      metadata: {
        category: 'social',
        importance: 'medium',
      },
    },
    {
      internalCode: 'PATIENT_FAMILY_HISTORY',
      questionType: QuestionType.TEXT,
      responseDataType: ResponseDataType.STRING,
      validationRules: {
        required: false,
        maxLength: 1000,
      },
      metadata: {
        category: 'family',
        importance: 'medium',
      },
    },
  ];

  for (const question of baseQuestions) {
    await prisma.baseQuestion.upsert({
      where: { internalCode: question.internalCode },
      update: {},
      create: {
        ...question,
        validationRules: question.validationRules as any,
        metadata: question.metadata as any,
      },
    });
  }

  console.log('Base questions seeded successfully!');
}
