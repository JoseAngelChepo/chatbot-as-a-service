var trae = require('trae')

const ApiService = trae.create({
  baseUrl: process.env.URL_BACKEND
})

module.exports = ApiService;
