const XRAY = require('aws-xray-sdk');
const AWS = require('aws-sdk');

module.exports = process.env.STAGE === 'prod' ? XRAY.captureAWS(AWS) : AWS;
