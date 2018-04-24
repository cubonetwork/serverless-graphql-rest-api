import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';
import { graphql } from 'graphql';
const schema = require('../../../src/graphql/schema');

const casesToTest = [
  {
    description: 'Should return campany name',
    query: `
      query {
        getCompanyInfo(id: "2") {
          name
        }  
      }
    `,
    expected: { data: { getCompanyInfo: { name: 'Itaú' } } }
  },
  {
    description: 'Should return campany name and contacts',
    query: `
      query {
        getCompanyInfo(id: "2") {
          name,
          contacts {
            name
          }
        }  
      }
    `,
    expected: { 
      data: { 
        getCompanyInfo: { 
          name: 'Itaú',
          contacts: [
            {
              name: 'Jon'
            }
          ] 
        } 
      } 
    }
  }
];

describe('Schema', () => {
 
  beforeAll(() => {
    addMockFunctionsToSchema({
      schema,
      mocks: {
        Company: () => ({
          id: '1',
          name: 'Itaú',
          contacts: [
            {
              email: 'jon@cubo.network',
              name: 'Jon',
              companyId: '1',            
              connections: [
                {
                  uid: '2',
                  rating: 3,
                  source: 'csv'
                },
                {
                  uid: '3',
                  rating: 5,
                  source: 'hubspot'
                },
                {
                  uid: '1',
                  rating: 2,
                  source: 'pipedrive'
                }
              ]
            }
          ]
        })
      }
    });
  });
  
  test('Has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(schema);
      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });

  casesToTest.forEach(obj => {
    const { description, query, expected } = obj;

    test(description, async () => {
      return await expect(graphql(schema, query)).resolves.toEqual(expected);
    });
  });

});