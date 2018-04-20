const Dynamo = require('../../infrastructure/aws/dynamodb');

const TableName = `${process.env.STAGE}.contacts`;

const getByCompanyId = companyId => {
  let params = {
    TableName,
    IndexName: 'companyId-index',
    KeyConditionExpression: 'companyId = :companyId',
    ExpressionAttributeValues: {
      ':companyId': companyId
    }
  };

  return Dynamo.query(params);
};

module.exports = {
  getByCompanyId
};