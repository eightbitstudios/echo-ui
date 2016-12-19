'use strict';

angular.module('echo.components.secureImage', [
  'echo.api.document'
])
  .component('secureImage', {
    bindings: {
      imageGuid: '<'
    },
    templateUrl: 'app/common/components/secure-image/secure-image.template.html',
    controller: function(documentApi) {
      var that = this;

      that.$onChanges = function(changeObj) {
        if (_.get(changeObj.imageGuid, 'currentValue')) {
          documentApi.fetchImage(that.imageGuid).then(function(data) {
            that.imageData = data;
          });
        }
      };
    }
  });