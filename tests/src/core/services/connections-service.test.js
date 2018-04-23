import { resolve } from 'dns';

const ConnectionsService = require('../../../../src/core/services/connections-service');
const ContactsRepository = require('../../../../src/core/repositories/dynamodb/contacts-repository');

jest.mock('../../../../src/core/repositories/dynamodb/contacts-repository');

describe('Connections Service', () => {
  test('Returns an empty array when company does not have contacts', async () => {
    const companyId = 1;
    ContactsRepository.getByCompanyId.mockResolvedValue([]);
    const connections = await ConnectionsService.getConnections(companyId, ContactsRepository);

    expect(connections).toEqual([]);
  });
});