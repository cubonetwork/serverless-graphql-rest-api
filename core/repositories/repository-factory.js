const RepositoryFactory = {
  getUsersRepository: () => {
    return require('./dynamodb/users-repository');
  },
  getContactsRepository: () => {
    return require('./dynamodb/contacts-repository');
  },
  getCompaniesRepository: () => {
    return require('./dynamodb/companies-repository');
  }
}; 

module.exports = RepositoryFactory;