const app = require('../server');

// Handle Vercel serverless function
module.exports = (req, res) => {
  app(req, res);
};

