'use strict';

angular.module('echo.api.document', [
  'echo.config.api'
]).factory('documentApi', function($q, $http, apiConfig) {
  return {
    fetchDocuments: function(loadGuid) {
      var url = apiConfig.documents({
        loadGuid: loadGuid
      });
      return $http.get(url).then(function(resp) {
        return resp.data.data;
      }).catch(function(resp) {
        return $q.reject(resp.data.status);
      });
    },
    fetchDocument: function(documentName){

        var url = apiConfig.documentsByIdPDF({
          documentName: documentName
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
    createDocuments: function(loadNumber, documentType, loadDocumentPages) {
      var url = apiConfig.documentUpload;

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
    }
  };
});