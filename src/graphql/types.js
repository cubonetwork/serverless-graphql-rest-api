// Main types
const UserType = require('./types/user');
const CompanyType = require('./types/company');
const ContactType = require('./types/contact');

// Query types
const CompanyConnectionsType = require('./types/queries/company-connections');

module.exports = [
  UserType,
  CompanyType,
  ContactType,
  CompanyConnectionsType
];