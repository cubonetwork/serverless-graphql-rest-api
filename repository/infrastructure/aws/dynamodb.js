const AWS = require('./aws');
const Options = { region: 'localhost', endpoint: 'http://localhost:8000' };
const DynamoDB = process.env.IS_OFFLINE ? new AWS.DynamoDB.DocumentClient(Options) : new AWS.DynamoDB.DocumentClient();

const execute = (command) => (params) => DynamoDB[command](params).promise();

const put = (params) => DynamoDB['put'](params).promise();

const scan = (params) => resolvePagination('scan', params);
const query = (params) => resolvePagination('query', params);

const resolvePagination = (command, params, result=[]) => {
  return execute(command)(params) 
    .then(data => {
      result = result.concat(data.Items);      
      if (data.LastEvaluatedKey) {
        params.ExclusiveStartKey = data.LastEvaluatedKey; 
        return resolvePagination(command, params, result);
      } 
      return result;
    });
};

const update = execute('update');
const remove = execute('delete');
const get = execute('get');
const batchGet = execute('batchGet');

module.exports = { put, update, delete: remove, get, query, scan, batchGet };
