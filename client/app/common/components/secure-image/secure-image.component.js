'use strict';

angular.module('echo.components.secureImage', [
    'echo.api.document',
    'echo.config.assetConfig'
  ])
  .component('secureImage', {
    bindings: {
      imageGuid: '<',
      thumbnail: '<'
    },
    templateUrl: 'secure-image.component.html',
    controller: function(store$, documentApi, assetConfig) {
      var that = this;

      that.$onChanges = function(changeObj) {
        if (_.get(changeObj.imageGuid, 'currentValue')) {
          var promise,
            carrierId = store$.getState().carrier.carrierId;

          if (that.thumbnail) {
            promise = documentApi.fetchImageThumbnail(carrierId, that.imageGuid);
          } else {
            promise = documentApi.fetchImage(carrierId, that.imageGuid);
          }

          promise.then(function(data) {
            that.imageData = data;
          }).catch(function() {
            that.imageData = assetConfig.JPG_FALLBACK;
          });
        } else if(changeObj.imageGuid.isFirstChange()){
          that.imageData = assetConfig.JPG_FALLBACK;
        }
      };
    }
  });