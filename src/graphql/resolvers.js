const UsersRepository = require('../core/repositories/dynamodb/users-repository');
const CompaniesRepository = require('../core/repositories/dynamodb/companies-repository');
const ContactsRepository = require('../core/repositories/dynamodb/contacts-repository');
const ConnectionsService = require('../core/services/connections-service');

const resolvers = {
  Query: {
    getCompanyInfo: (root, args) => CompaniesRepository.getById(args.id),
    getConnections: (root, args) => ConnectionsService.getConnections(args.companyId)
  },
  Company: {
    contacts: (company, args) => ContactsRepository.getByCompanyId(company.id)
  },
  Contact: {
    company: (contact) => CompaniesRepository.getById(contact.companyId)
  },
  UserConnection: {
    user: (connection) => UsersRepository.getByUid(connection.uid)
  },
  CompanyConnections: {
    user: (connection) => UsersRepository.getByUid(connection.uid)
  }
};

module.exports = { resolvers };