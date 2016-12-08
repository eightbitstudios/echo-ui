'use strict';

angular.module('echo.api.document', [
  'echo.config.api'
]).factory('documentApi', function($q, $http, apiConfig) {
  return {
    fetchDocuments: function(loadId) {
      var url = apiConfig.documents({
        loadId: loadId
      });
      return $http.get(url).then(function (resp) {
        return resp.data.data;
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
      });
    }
  };
});