angular.module('echo.index.myCarriers.repAdmin.allCarriers', [
  'echo.services.carrier',
  'echo.config.routesConfig',
  'echo.components.searchBar',
  'echo.components.sidebarList'
])
  .component('allCarriers', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/all-carriers/all-carriers.template.html',
    bindings: {},
    controller: function ($stateParams, routesConfig, carrierService) {
      var that = this;

      that.routesConfig = routesConfig;
      that.isLoading = true;
      that.searchParam = '';
      that.minSearchCharacters = 3;
      
      carrierService.fetchCarriers().then(function (carriers) {

        that.carrierList = _(carriers).sortBy('name').value(); // Sort all carriers by their name

        // Set a carrier to selected if user is routed to page with a carrier id  
        that.selectCarrier(that.carrierList, $stateParams.id);
        that.isLoading = false;
      });

      /**
       * @description Sets a state for a carrier to selected
       * @param {Array.<CarrierModel>} carrierList - List of carrier models
       * @param {number} id - Carrier Id to search for in carrier list
       */
      that.selectCarrier = function (carrierList, id) {
        var carrier = _.find(carrierList, { id: _.parseInt(id, 10) });
        if (carrier) {
          carrier.selected = true;
        }
      };
    }
  });
