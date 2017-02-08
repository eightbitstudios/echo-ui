'use strict';

angular.module('echo.components.secureImage', [
    'echo.api.document'
  ])
  .component('secureImage', {
    bindings: {
      imageGuid: '<',
      thumbnail: '<'
    },
    templateUrl: 'app/common/components/secure-image/secure-image.template.html',
    controller: function(documentApi) {
      var that = this;

      that.$onChanges = function(changeObj) {
        if (_.get(changeObj.imageGuid, 'currentValue')) {
          var promise;

          if (that.thumbnail) {
            promise = documentApi.fetchImageThumbnail(that.imageGuid);
          } else {
            promise = documentApi.fetchImage(that.imageGuid);
          }

          promise.then(function(data) {
            that.imageData = data;
          });
        }
      };
    }
  });