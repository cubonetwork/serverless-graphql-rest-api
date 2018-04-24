module.exports = `
  type Company {
    id: String!
    name: String!
    createdAt: Int!
    contacts: [Contact]
  }
`;