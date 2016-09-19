angular.module('echo.components.modal.milestones.rating', [])
  .component('rating', {
    templateUrl: 'app/common/components/modal/milestones/report-delivery-modal/components/rating/rating.template.html',
    bindings: {
      rating: '='
    },
    controller: function () {
      var that = this;

      that.max = 5;

      that.ratingStates = [
        { stateOn: 'icon-star-filled', stateOff: 'icon-star' },
        { stateOn: 'icon-star-filled', stateOff: 'icon-star' },
        { stateOn: 'icon-star-filled', stateOff: 'icon-star' },
        { stateOn: 'icon-star-filled', stateOff: 'icon-star' },
        { stateOn: 'icon-star-filled', stateOff: 'icon-star' }
      ];
    }
  });