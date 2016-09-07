angular.module('echo.components.modal.milestones.reportDelivery.comment', [
])
  .component('comment', {
    templateUrl: 'app/common/components/modal/milestones/report-delivery-modal/components/comment/comment.template.html',
    bindings: {
      saveCallback: '&',
      cancelCallback: '&',
      comment: '<'
    },
    controller: function () {
      var that = this;

      that.deliveryComment = that.comment;

      that.saveComment = function() {
        that.saveCallback({comment: that.deliveryComment});
      };
    }
  });