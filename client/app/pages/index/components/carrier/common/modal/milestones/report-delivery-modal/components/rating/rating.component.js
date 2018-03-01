angular.module('echo.components.modal.milestones.rating', [
    'echo.config.appConstants'
  ])
  .component('rating', {
    templateUrl: 'rating.component.html',
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