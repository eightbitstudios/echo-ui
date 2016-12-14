'use strict';

angular.module('echo.filters.documentType', [
    'echo.constants.documentTypes'
  ])
  .filter('documentType', function(documentTypes) {
    return function(document, documents) {
      var description = '';

      var documentType = _.find(documentTypes, function(type) {
        return type.value === document.documentSubType;
      });

      if (_(documentType).chain().get('description').isFunction().value()) {
        description = documentType.description({
          documentNumber: (_(documents).filter(function(document) {
            return document.documentSubType === documentType.value;
          }).findIndex(document) + 1)
        });
      } else {
        description = _.get(documentType, 'description');
      }

      return description;
    };
  });