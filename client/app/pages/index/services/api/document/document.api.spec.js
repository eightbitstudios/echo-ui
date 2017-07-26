describe('Api: carrierApi', function() {
  'use strict';

  var $scope,
    $q,
    $http,
    documentApi,
    apiConfig,
    getRes,
    postRes,
    putRes,
    deleteRes,
    moment;

  beforeEach(function() {

    module('echo.api.document', function($provide) {
      $provide.value('$http', $http = jasmine.createSpyObj('$http', ['get', 'post', 'put', 'delete']));
      $provide.constant('moment', moment = jasmine.createSpy('moment'));
    });

    inject(function($rootScope, _$q_, _$http_, _apiConfig_, _documentApi_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      apiConfig = _apiConfig_;

      documentApi = _documentApi_;
    });

    $http.get.and.returnValue($q.when(getRes = {}));
    $http.post.and.returnValue($q.when(postRes = {}));
    $http.put.and.returnValue($q.when(putRes = {}));
    $http.delete.and.returnValue($q.when(deleteRes = {}));
    moment.and.returnValue(jasmine.createSpyObj('format', ['format']));
  });

  describe('Function: fetchDocuments', function() {
    it('should call documents endpoint', function(done) {
      var carrierId = '1234',
        loadGuid = 'A1234';

      getRes.data = {
        data: ''
      };

      documentApi.fetchDocuments(carrierId, loadGuid).then(function() {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.documents)({
          loadGuid: loadGuid,
          carrierId: carrierId
        }));
        done();
      });

      $scope.$digest();
    });

    it('should return error if document isnt found', function(done) {
      var carrierId = '1234',
        loadGuid = 'A1234';

      $http.get.and.returnValue($q.reject(getRes = {}));
      getRes.data = {
        status: 401
      };

      documentApi.fetchDocuments(carrierId, loadGuid).catch(function(error) {
        expect(error).toBe(getRes.data.status);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchDocument', function() {
    it('should call document endpoint', function(done) {
      var carrierId = '1234',
        documentName = 'test.pdf';

      getRes.data = {
        data: ''
      };

      documentApi.fetchDocument(carrierId, documentName).then(function() {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.documentsByIdPDF)({
          documentName: documentName,
          carrierId: carrierId
        }), {
          responseType: 'arraybuffer',
          cache: 'true'
        });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchImage', function() {
    it('should call image endpoint', function(done) {
      var carrierId = '1234',
        imageGuid = 'A4123';

      getRes.data = {
        data: ''
      };

      documentApi.fetchImage(carrierId, imageGuid).then(function() {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.documentById)({
          documentId: imageGuid,
          carrierId: carrierId
        }), {
          cache: 'true'
        });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchImageThumbnail', function() {
    it('should call image thumbnail endpoint', function(done) {
      var carrierId = '1234',
        imageGuid = 'A4123';

      getRes.data = {
        data: ''
      };

      documentApi.fetchImageThumbnail(carrierId, imageGuid).then(function() {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.documentsByIdThumbnail)({
          documentId: imageGuid,
          carrierId: carrierId
        }), {
          cache: 'true'
        });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: createDocuments', function() {
    it('should call create document endpoint', function(done) {
      var carrierId = '1234',
        loadNumber = '546345345',
        documentType = 'INVOICE',
        loadDocumentPages = [{
          fileData: 'VASDFETQWER'
        }];

      documentApi.createDocuments(carrierId, loadNumber, documentType, loadDocumentPages).then(function() {
        expect($http.post).toHaveBeenCalled();
        done();
      });

      $scope.$digest();
    });

    it('should return error if document upload fails', function(done) {
      var carrierId = '1234',
        loadNumber = '546345345',
        documentType = 'INVOICE',
        loadDocumentPages = [{
          fileData: 'VASDFETQWER'
        }];

      $http.post.and.returnValue($q.reject(postRes = {}));
      postRes.data = {
        status: 500
      };

      documentApi.createDocuments(carrierId, loadNumber, documentType, loadDocumentPages).catch(function(error) {
        expect(error).toBe(postRes.data.status);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: createInvoices', function() {
    it('should call create invoice endpoint', function(done) {
      var carrierId = '1234',
        loadNumber = '546345345',
        invoiceNumber = '123',
        invoiceRate = '124',
        invoicePages = [{
          fileData: 'VASDFETQWER'
        }];

      documentApi.createInvoices(carrierId, loadNumber, invoicePages, invoiceNumber, invoiceRate).then(function() {
        expect($http.post).toHaveBeenCalled();
        done();
      });

      $scope.$digest();
    });

    it('should return error if invoice upload fails', function(done) {
      var carrierId = '1234',
        loadNumber = '546345345',
        invoiceNumber = '123',
        invoiceRate = '124',
        invoicePages = [{
          fileData: 'VASDFETQWER'
        }];

      $http.post.and.returnValue($q.reject(postRes = {}));
      postRes.data = {
        status: 500
      };

      documentApi.createInvoices(carrierId, loadNumber, invoicePages, invoiceNumber, invoiceRate).catch(function(error) {
        expect(error).toBe(postRes.data.status);
        done();
      });

      $scope.$digest();
    });
  });
});