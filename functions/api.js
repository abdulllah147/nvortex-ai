const serverless = require('serverless-http');
const app = require('../server.js'); // Aapki main server file

module.exports.handler = serverless(app);