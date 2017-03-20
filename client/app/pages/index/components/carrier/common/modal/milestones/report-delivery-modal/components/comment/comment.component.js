angular.module('echo.components.modal.milestones.reportDelivery.comment', [
    'echo.config.appConstants'
  ])
  .component('comment', {
    templateUrl: 'comment.component.html',
    bindings: {
      comment: '='
    },
    controller: function(appConstants) {
      var that = this;

      that.$onInit = function() {
        that.commentMaxLength = appConstants.COMMENT_MAX_LENGTH;
      };
    }
  });