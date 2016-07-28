angular.module('echo.index.myCarriers.allCarriers', [
  'echo.api.carrier',
  'echo.config.routes',
  'echo.services.user',
  'echo.components.searchBar',
  'echo.components.loading',
  'echo.components.sidebarList',
  'echo.config.appConstants'
])
  .component('allCarriers', {
    templateUrl: 'app/pages/index/my-carriers/components/all-carriers/all-carriers.template.html',
    bindings: {},
    controller: function ($stateParams, routesConfig, carrierApi, appConstants, userService) {
      var that = this;

      that.routesConfig = routesConfig;
      that.showLoading = true;
      that.searchParam = '';
      that.minSearchCharacters = appConstants.MIN_SEARCH_CHARACTERS.CARRIERS;

      var repId = userService.getUser().repId;

      carrierApi.fetchCarriers(repId).then(function (carriers) {

        that.carrierList = _(carriers).sortBy('carrierName').value(); // Sort all carriers by their name

        // Set a carrier to selected if user is routed to page with a carrier id  
        that.selectCarrier(that.carrierList, $stateParams.carrierId);
        that.showLoading = false;
      });

      /**
       * @description Sets a state for a carrier to selected
       * @param {Array.<CarrierModel>} carrierList - List of carrier models
       * @param {number} carrierId - Carrier Id to search for in carrier list
       */
      that.selectCarrier = function (carrierList, carrierId) {
        var carrier = _.find(carrierList, { carrierId: _.parseInt(carrierId, 10) });
        if (carrier) {
          carrier.selected = true;
        }
      };
    }
  });
