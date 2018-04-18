const Dynamo = require('../infrastructure/aws/dynamodb');

const TableName = `${process.env.STAGE}.users`;

const getByUid = uid => {
  let params = {
    TableName,
    Key: {
      uid: uid
    }
  };

  return Dynamo.get(params)
    .then(data => data.Item);
};

module.exports = {
  getByUid
};