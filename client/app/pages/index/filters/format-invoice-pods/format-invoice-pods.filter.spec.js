'use strict';

describe('Filter - Format Invoice/PODs filter', function () {
  var formatInvoicePODs;

  beforeEach(function () {
    module('echo.filters.formatInvoicePODs');

    inject(function ($filter) {
      formatInvoicePODs = $filter('formatInvoicePODs');
    });
  });

  it('should return empty string if null load', function () {
    expect(formatInvoicePODs(null)).toEqual('');
  });

  it('should return empty string if empty load', function () {
    expect(formatInvoicePODs({})).toEqual('');
  });

  it('should return empty string if only 0 PODs', function () {
    var pods = 0;
    expect(formatInvoicePODs({ neededPODs: pods })).toEqual('');
  });

  it('should return empty string if only false needsInvoice', function () {
    var invoice = false;
    expect(formatInvoicePODs({ needsInvoice: invoice })).toEqual('');
  });

  it('should return empty string if no invoice required and 0 PODs', function () {
    var pods = 0,
      invoice = false;
    expect(formatInvoicePODs({ neededPODs: pods, needsInvoice: invoice })).toEqual('');
  });

  it('should return Need POD string if no invoice required and 1 POD', function () {
    var pods = 1,
      invoice = false;
    expect(formatInvoicePODs({ neededPODs: pods, needsInvoice: invoice })).toEqual('Need POD');
  });

  it('should return Need 1 POD string if no invoice required and 1 POD, multi-stop', function () {
    var pods = 1,
      invoice = false;
    expect(formatInvoicePODs({ neededPODs: pods, needsInvoice: invoice, pickUp: [{},{}] })).toEqual('Need 1 POD');
  });

  it('should return Need 2 PODs string if no invoice required and 2 POD', function () {
    var pods = 2,
      invoice = false;
    expect(formatInvoicePODs({ neededPODs: pods, needsInvoice: invoice })).toEqual('Need 2 PODs');
  });

  it('should return Need Invoice if no invoice required and 0 PODs', function () {
    var pods = 0,
      invoice = true;
    expect(formatInvoicePODs({ neededPODs: pods, needsInvoice: invoice })).toEqual('Need Invoice');
  });

  it('should return Need POD and Invoice string if no invoice required and 1 POD', function () {
    var pods = 1,
      invoice = true;
    expect(formatInvoicePODs({ neededPODs: pods, needsInvoice: invoice })).toEqual('Need POD and Invoice');
  });

  it('should return Need 1 POD and Invoice string if no invoice required and 1 POD, multi-stop', function () {
    var pods = 1,
      invoice = true;
    expect(formatInvoicePODs({ neededPODs: pods, needsInvoice: invoice, delivery: [{},{}] })).toEqual('Need 1 POD and Invoice');
  });

  it('should return Need 2 PODs and Invoice string if no invoice required and 2 POD', function () {
    var pods = 2,
      invoice = true;
    expect(formatInvoicePODs({ neededPODs: pods, needsInvoice: invoice })).toEqual('Need 2 PODs and Invoice');
  });

  it('should return Need 7 PODs and Invoice string if no invoice required and 2 POD', function () {
    var pods = 7,
      invoice = true;
    expect(formatInvoicePODs({ neededPODs: pods, needsInvoice: invoice })).toEqual('Need 7 PODs and Invoice');
  });

  it('should return Need Invoice string if invalid POD count', function () {
    var pods = -1,
      invoice = true;
    expect(formatInvoicePODs({ neededPODs: pods, needsInvoice: invoice })).toEqual('Need Invoice');
  });
});
