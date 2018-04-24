const ConnectionsService = require('../../../../src/core/services/connections-service');
const ContactsRepository = require('../../../../src/core/repositories/dynamodb/contacts-repository');

jest.mock('../../../../src/core/repositories/dynamodb/contacts-repository');

describe('Connections Service', () => {
  
  test('Returns an empty array when company does not have contacts', async () => {
    const companyId = 1;
    ContactsRepository.getByCompanyId.mockResolvedValue([]);
    const connections = await ConnectionsService.getConnections(companyId);

    expect(connections).toEqual([]);
  });

  test('Returns an array containing users, connections count and rating amount', async () => {
    const companyId = 1;
    ContactsRepository.getByCompanyId.mockResolvedValue([
      {
        connections: [
          {
            uid: '2',
            rating: 1,
            source: 'csv',
            createdAt: 1523992555000
          }
        ]
      },
      {
        connections: [
          {
            uid: '2',
            rating: 1,
            source: 'hubspot',
            createdAt: 1523992555000
          }
        ]
      },
      {
        connections: [
          {
            uid: '2',
            rating: 3,
            source: 'csv',
            createdAt: 1523992555000
          },
          {
            uid: '3',
            rating: 5,
            source: 'hubspot',
            createdAt: 1523992555000
          },
          {
            uid: '1',
            rating: 2,
            source: 'pipedrive',
            createdAt: 1523992555000
          }
        ]
      }
    ]);

    const connections = await ConnectionsService.getConnections(companyId);

    expect(connections).toEqual([
      {
        uid: '2',
        ratingSum: 5,
        contactsAmount: 3
      },
      {
        uid: '3',
        ratingSum: 5,
        contactsAmount: 1
      },
      {
        uid: '1',
        ratingSum: 2,
        contactsAmount: 1
      }
    ]);
  });

  test('Should calculate rating amount properly', async () => {
    const companyId = 1;
    ContactsRepository.getByCompanyId.mockResolvedValue([
      {
        connections: [
          {
            uid: '2',
            rating: 1,
            source: 'csv',
            createdAt: 1523992555000
          }
        ]
      },
      {
        connections: [
          {
            uid: '2',
            rating: 2,
            source: 'hubspot',
            createdAt: 1523992555000
          }
        ]
      },
      {
        connections: [
          {
            uid: '2',
            rating: 4,
            source: 'gmail',
            createdAt: 1523992555000
          }
        ]
      }
    ]);

    const connections = await ConnectionsService.getConnections(companyId);

    expect(connections[0]).toEqual({
      uid: '2',
      ratingSum: 7,
      contactsAmount: 3
    })

  });

});