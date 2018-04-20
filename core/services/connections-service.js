const _ = require('lodash/fp');
const ContactsRepository = require('../repositories/repository-factory').getContactsRepository();

const getConnections = companyId => {
  return ContactsRepository.getByCompanyId(companyId)
    .then(contacts => {
      const connections = [];

      _.each(contact => {
        _.each(connection => {
          const userConnection = _.find({ uid: connection.uid}, connections);
          if(userConnection) {
            userConnection.ratingSum += connection.rating;
            userConnection.contactsAmount += 1;
          } else {
            connections.push({
              uid: connection.uid,
              ratingSum: connection.rating,
              contactsAmount: 1
            });
          }
        }, contact.connections)
      }, contacts);

      return connections;
    })
};

module.exports = { getConnections };