angular.module('echo.index.carrier.myCompany.driverProfile', [
  'echo.components.driverProfile',
  'echo.components.usage',
  'echo.components.assignments',
  'echo.components.loading',
  'echo.models.driver',
  'echo.api.driver',
  'echo.config.routes',
  'echo.api.language'
])
  .component('myCompanyDriverProfile', {
    templateUrl: 'app/pages/index/carrier/components/my-company/components/my-company-driver-profile/my-company-driver-profile.template.html',
    bindings: {
      carrierId: '<'
    },
    controller: function ($q, $state, $stateParams, routesConfig, DriverModel, driverApi, languageApi) {
      var that = this;
      that.loading = true;
      that.routesConfig = routesConfig;

      that.loadDriverDetails = function (changeObject) {
        if (changeObject.carrierId && changeObject.carrierId.currentValue) {
          if ($stateParams.driverId) {
            $q.all([driverApi.fetchDriverById(that.carrierId, $stateParams.driverId), languageApi.fetchLanguages()])
              .then(_.spread(function (driver, languages) {
                that.driver = driver;
                that.languages = languages;
              })).finally(function () {
                that.loading = false;
              });
          } else {
            languageApi.fetchLanguages().then(function (languages) {
              that.driver = new DriverModel();
              that.languages = languages;
            }).finally(function () {
              that.loading = false;
            });
          }
        }
      };

      that.profileUpdated = function () {
        $state.go(routesConfig.INDEX.myCompanyDrivers.name);
      };

      that.$onChanges = that.loadDriverDetails;
    }
  });
