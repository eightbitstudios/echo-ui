var ResTemplate = require('../data/res-template.js'),
  _ = require('lodash'),
  documentsRes = require('../data/documents-res.js'),
  responseUtil = require('../util/response-util.js'),
  path = require('path');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  createDocuments: function(req, res) {
    responseUtil.timeout(function() {
      res.json(new ResTemplate());
    }, minDelay, maxDelay);
  },
  fetchDocuments: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = documentsRes;
    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  fetchDocumentById: function(req, res) {
    responseUtil.timeout(function() {
      res.sendFile(path.resolve('server/mock-routes/data/document-preview-TEMP.jpg'));
    }, minDelay, maxDelay);
  },
  fetchDocumentByIdThumbnail: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = documentsRes;
    responseUtil.timeout(function() {
      res.sendFile(path.resolve('server/mock-routes/data/document_image.png'));
    }, minDelay, maxDelay);
  },
  fetchDocumentByIdPDF: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = documentsRes;
    responseUtil.timeout(function() {
      res.sendFile(path.resolve('server/mock-routes/data/document.pdf'));
    }, minDelay, maxDelay);
  }
};