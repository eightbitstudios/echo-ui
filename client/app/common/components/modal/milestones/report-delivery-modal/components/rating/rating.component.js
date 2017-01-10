angular.module('echo.components.modal.milestones.rating', [])
  .component('rating', {
    templateUrl: 'app/common/components/modal/milestones/report-delivery-modal/components/rating/rating.template.html',
    bindings: {
      rating: '='
    },
    controller: function() {
      this.$onInit = function() {
        this.max = 5;

        this.ratingStates = [{
          stateOn: 'icon-star-filled',
          stateOff: 'icon-star'
        }, {
          stateOn: 'icon-star-filled',
          stateOff: 'icon-star'
        }, {
          stateOn: 'icon-star-filled',
          stateOff: 'icon-star'
        }, {
          stateOn: 'icon-star-filled',
          stateOff: 'icon-star'
        }, {
          stateOn: 'icon-star-filled',
          stateOff: 'icon-star'
        }];
      };
    }
  });