'use strict';

angular.module('echo.api.document', [
  'echo.config.api',
  'echo.config.globals'
]).factory('documentApi', function($q, $http, apiConfig, moment) {
  return {
    fetchDocuments: function(carrierId, loadGuid) {
      var url = _.template(apiConfig.documents)({
        loadGuid: loadGuid,
        carrierId: carrierId
      });
      return $http.get(url).then(function(resp) {
        return resp.data.data;
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    fetchDocument: function(carrierId, documentName) {

      var url = _.template(apiConfig.documentsByIdPDF)({
        documentName: documentName,
        carrierId: carrierId
      });

      var config = {
        responseType: 'arraybuffer',
        cache: 'true'
      };

      return $http.get(url, config).then(function(document) {
        return new Blob([document.data], {
          type: 'application/pdf'
        });
      });
    },
    fetchImage: function(carrierId, imageGuid) {
      var url = _.template(apiConfig.documentById)({
        documentId: imageGuid,
        carrierId: carrierId
      });

      var config = {
        cache: 'true'
      };

      return $http.get(url, config)
        .then(function(resp) {
          return 'data:image/jpeg;base64,' + resp.data.data;
        });
    },
    fetchImageThumbnail: function(carrierId, imageGuid) {
      var url = _.template(apiConfig.documentsByIdThumbnail)({
        documentId: imageGuid,
        carrierId: carrierId
      });

      var config = {
        cache: 'true'
      };

      return $http.get(url, config)
        .then(function(resp) {
          return 'data:image/jpeg;base64,' + resp.data.data;
        });
    },
    createDocuments: function(carrierId, loadNumber, documentType, loadDocumentPages) {
      var url = _.template(apiConfig.documentUpload)({
        carrierId: carrierId
      });

      var body = new FormData();

      body.append('documentSubType', documentType);
      body.append('loadNumber', loadNumber);

      _.forEach(loadDocumentPages, function(page) {
        body.append('loadDocumentPages', page.fileData);
      });

      return $http.post(url, body, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    createInvoices: function(carrierId, loadNumber, invoicePages, invoiceNumber, invoiceRate, invoiceDate) {
      var url = _.template(apiConfig.invoiceUpload)({
        carrierId: carrierId
      });

      var body = new FormData();

      body.append('loadNumber', loadNumber);
      body.append('invoiceNumber', invoiceNumber);
      body.append('invoiceRate', invoiceRate);
      body.append('invoiceDate', moment(invoiceDate).format('ddd MMM DD YYYY'));

      _.forEach(invoicePages, function(page) {
        body.append('invoicePages', page.fileData);
      });

      return $http.post(url, body, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    }
  };
});