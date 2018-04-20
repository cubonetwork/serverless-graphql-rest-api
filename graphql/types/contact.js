module.exports = `
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
`;