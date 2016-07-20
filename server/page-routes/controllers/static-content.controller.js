var config = require('../../config'),
  pages = require('../../config/pages');

var StaticContentController = function () {
  var that = this;

  /**
   * @description Serves up login page
   * @param {Object} req - Http Request
   * @param {Object} res - Http Response
   */
  that.getLoginPage = function (req, res) {
    res.sendFile(pages.login.file, {root: config.server.staticFolders[0]});
  };
};

module.exports = new StaticContentController();
