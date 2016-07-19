var pages = require('../config/pages'),
  staticContentController = require('./controllers/static-content.controller.js');
module.exports = function (app) {
  app.get(pages.login.route, staticContentController.getLoginPage);
};