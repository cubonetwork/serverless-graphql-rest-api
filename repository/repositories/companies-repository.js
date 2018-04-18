const Dynamo = require('../infrastructure/aws/dynamodb');

const TableName = `${process.env.STAGE}.companies`;

const getById = id => {
  let params = {
    TableName,
    Key: {
      id: id
    }
  };

  return Dynamo.get(params)
    .then(data => data.Item);
};

module.exports = {
  getById
};