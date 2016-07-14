angular.module('echo.index.myCarriers.repAdmin.allCarriers', [
  'echo.services.carrier',
  'echo.config.routes',
  'echo.components.searchBar',
  'echo.components.loading',
  'echo.components.sidebarList',
  'echo.config.appConstants'
])
  .component('allCarriers', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/all-carriers/all-carriers.template.html',
    bindings: {},
    controller: function ($stateParams, routesConfig, carrierService, appConstants) {
      var that = this;

      that.routesConfig = routesConfig;
      that.showLoading = true;
      that.searchParam = '';
      that.minSearchCharacters = appConstants.MIN_SEARCH_CHARACTERS.CARRIERS;

      carrierService.fetchCarriers().then(function (carriers) {

        that.carrierList = _(carriers).sortBy('name').value(); // Sort all carriers by their name

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
