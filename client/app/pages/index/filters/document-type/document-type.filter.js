'use strict';

angular.module('echo.filters.documentType', [
    'echo.constants.documentTypeConstants'
  ])
  .filter('documentType', function(documentTypeConstants) {
    return function(document, documents) {
      var description = '';

      var documentType = _.find(documentTypeConstants, function(type) {
        return type.value === _.parseInt(document.documentSubType, 10);
      });

      if (_(documentType).chain().get('description').isFunction().value()) {
        description = documentType.description({
          documentNumber: (_(documents).filter(function(document) {
            return _.parseInt(document.documentSubType, 10) === documentType.value;
          }).findIndex(document) + 1)
        });
      } else {
        description = _.get(documentType, 'description');
      }

      return description;
    };
  });