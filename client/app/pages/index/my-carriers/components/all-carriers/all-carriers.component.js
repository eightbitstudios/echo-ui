angular.module('echo.index.myCarriers.allCarriers', [
    'echo.api.carrier',
    'echo.config.routes',
    'echo.services.userProfile',
    'echo.components.filterBar',
    'echo.components.loading',
    'echo.components.sidebarList',
    'echo.config.appConstants'
  ])
  .component('allCarriers', {
    templateUrl: 'app/pages/index/my-carriers/components/all-carriers/all-carriers.template.html',
    bindings: {},
    controller: function($stateParams, store$, routesConfig, carrierApi, appConstants, userProfileService) {

      /**
       * @description Sets a state for a carrier to selected
       * @param {Array.<CarrierModel>} carrierList - List of carrier models
       * @param {number} carrierId - Carrier Id to search for in carrier list
       */
      this.selectCarrier = function(carrierList, carrierId) {
        var carrier = _.find(carrierList, {
          carrierId: _.parseInt(carrierId, 10)
        });
        if (carrier) {
          carrier.selected = true;
        }
      };

      this.$onInit = function() {
        var that = this;

        that.routesConfig = routesConfig;
        that.showLoading = true;
        that.searchParam = '';
        that.minSearchCharacters = appConstants.MIN_SEARCH_CHARACTERS.CARRIERS;
        var state = store$.getState();

        carrierApi.fetchCarriers(state.user.userId).then(function(carriers) {
          that.carrierList = _(carriers).sortBy('carrierName').value(); // Sort all carriers by their name
          // Set a carrier to selected if user is routed to page with a carrier id  
          that.selectCarrier(that.carrierList, $stateParams.carrierId);
        }).finally(function() {
           that.showLoading = false;
        });
      };
    }
  });