var responseUtil = require('../util/response-util.js'),
  invoicesRes = require('../data/invoices-res'),
  _ = require('lodash'),
  ResTemplate = require('../data/res-template.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  getInvoices: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data.invoices = _.slice(invoicesRes.invoices, _.parseInt(req.query.offset) - 1, _.parseInt(req.query.offset) + _.parseInt(req.query.limit) - 1);
    resTemplate.data.invoicesCount = invoicesRes.invoicesCount;

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getInvoicesBySearchText: function(req, res) {
    var resTemplate = new ResTemplate();
    var searchText = req.query.searchText;
    resTemplate.data.invoices = _.filter(invoicesRes.invoices, function(item) {
      return item.invoiceNumber.toString().indexOf(searchText) > -1;
    });

    resTemplate.data.count = invoicesRes.invoicesCount.activeInvoices;

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getInvoicesCount: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = invoicesRes.invoicesCount;

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};
