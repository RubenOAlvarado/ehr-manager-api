import { PrismaClient, ActionType } from '@prisma/client';

export async function seedAuditLogs(prisma: PrismaClient) {
  console.log('Seeding audit logs...');

  const auditLogs: any[] = [];

  const actionTypes: ActionType[] = [
    'CREATE',
    'READ',
    'UPDATE',
    'DELETE',
    'LOGIN',
    'LOGOUT',
    'EXPORT',
    'IMPORT',
  ];

  const tables = [
    'patients',
    'patient_responses',
    'ehr_mappings',
    'clients',
    'question_sets',
  ];

  const users = [
    'admin@example.com',
    'user1@example.com',
    'user2@example.com',
    'support@example.com',
    'system@example.com',
  ];

  const ipAddresses = [
    '192.168.1.100',
    '10.0.0.25',
    '172.16.10.1',
    '127.0.0.1',
    '8.8.8.8',
  ];

  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    'PostmanRuntime/7.28.0',
  ];

  for (let i = 0; i < 50; i++) {
    const actionType =
      actionTypes[Math.floor(Math.random() * actionTypes.length)];
    const tableName =
      actionType !== 'LOGIN' && actionType !== 'LOGOUT'
        ? tables[Math.floor(Math.random() * tables.length)]
        : null;

    let oldValues = {};
    let newValues = {};

    if (actionType === 'UPDATE') {
      oldValues = {
        name: 'Previous Name',
        status: 'INACTIVE',
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      };

      newValues = {
        name: 'Updated Name',
        status: 'ACTIVE',
        updatedAt: new Date().toISOString(),
      };
    } else if (actionType === 'CREATE') {
      newValues = {
        id: `rec-${Math.floor(Math.random() * 10000)}`,
        name: 'New Record',
        createdAt: new Date().toISOString(),
      };
    } else if (actionType === 'DELETE') {
      oldValues = {
        id: `rec-${Math.floor(Math.random() * 10000)}`,
        name: 'Deleted Record',
        deletedAt: null,
      };

      newValues = {
        deletedAt: new Date().toISOString(),
      };
    }

    const auditLog = await prisma.auditLog.create({
      data: {
        actionType,
        tableName,
        recordId: tableName ? `id-${Math.floor(Math.random() * 10000)}` : null,
        oldValues,
        newValues,
        performedBy: users[Math.floor(Math.random() * users.length)],
        performedAt: new Date(
          Date.now() - Math.floor(Math.random() * 30 * 86400000),
        ),
        ipAddress: ipAddresses[Math.floor(Math.random() * ipAddresses.length)],
        userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
      },
    });

    auditLogs.push(auditLog);
  }

  console.log(`Created ${auditLogs.length} audit logs`);
}
