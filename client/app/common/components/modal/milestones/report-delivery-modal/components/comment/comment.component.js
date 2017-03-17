angular.module('echo.components.modal.milestones.reportDelivery.comment', [
    'echo.config.appConstants'
  ])
  .component('comment', {
    templateUrl: 'app/common/components/modal/milestones/report-delivery-modal/components/comment/comment.template.html',
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