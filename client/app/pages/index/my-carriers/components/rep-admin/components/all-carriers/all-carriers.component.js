angular.module('echo.index.myCarriers.repAdmin.allCarriers', [
  'echo.services.carrier',
  'echo.config.routes',
  'echo.components.searchBar',
  'echo.components.sidebarList'
])
  .component('allCarriers', {
    templateUrl: 'app/pages/index/my-carriers/components/rep-admin/components/all-carriers/all-carriers.template.html',
    bindings: {},
    controller: function ($stateParams, routesConfig, carrierService) {
      var that = this;

      that.routesConfig = routesConfig;

      carrierService.fetchCarriers().then(function (carriers) {

        that.carrierList = _(carriers).sortBy('name').value(); // Sort all carriers by their name

        /**
         * Groups a list of carriers by the first letter in their name and maps them to an object.
         */
        that.sidebarCarrierList = _(that.carrierList)
          .groupBy(function (carrier) {
            return carrier.name.charAt(0);
          }).map(function (value, prop) {
            return {
              values: value,
              letter: prop
            };
          }).value();

        // Set a carrier to selected if user is routed to page with a carrier id  
        that.selectCarrier(that.carrierList, $stateParams.carrierId);
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
