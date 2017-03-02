angular.module('echo.components.modal.milestones.rating', [
    'echo.config.appConstants'
  ])
  .component('rating', {
    templateUrl: 'app/common/components/modal/milestones/report-delivery-modal/components/rating/rating.component.html',
    bindings: {
      rating: '='
    },
    controller: function(appConstants) {
      this.$onInit = function() {
        this.max = appConstants.MAX_STAR_RATING;
        
        this.ratingStates = _.times(this.max, function() {
          return {
            stateOn: 'icon-star-filled',
            stateOff: 'icon-star'
          };
        });
      };
    }
  });