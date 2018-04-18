const schema = `
type Query {
  getCompanyInfo(id: String!): Company!
  getConnections(companyId: String!): [CompanyConnections]
}

type User {
  uid: String!
  name: String!
  createdAt: Int!
}

type Company {
  id: String!
  name: String!
  createdAt: Int!
  contacts: [Contact]
}

type Contact {
  email: String!
  name: String!    
  connections: [UserConnection]
  company: Company!
  createdAt: Int!
}

type UserConnection {
  user: User!
  rating: Int!
  source: String!
  createdAt: Int!
}

type CompanyConnections {
  user: User!
  ratingSum: Int!
  contactsAmount: Int!
}

schema {
  query: Query
}
`;

module.exports = { schema }; 