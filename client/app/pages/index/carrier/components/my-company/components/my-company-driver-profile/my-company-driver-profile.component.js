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
      carrierId: '<',
      driverId: '<'
    },
    controller: function($q, $state, routesConfig, DriverModel, driverApi, languageApi) {

      this.$onInit = function() {
        var that = this;
        
        that.loading = true;
        that.routesConfig = routesConfig;

        if (that.driverId) {
          $q.all([driverApi.fetchDriverById(that.carrierId, that.driverId), languageApi.fetchLanguages()])
            .then(_.spread(function(driver, languages) {
              that.driver = driver;
              that.languages = languages;
            })).finally(function() {
              that.loading = false;
            });
        } else {
          languageApi.fetchLanguages().then(function(languages) {
            that.driver = new DriverModel();
            that.languages = languages;
          }).finally(function() {
            that.loading = false;
          });
        }
      };

      this.profileUpdated = function() {
        $state.go(routesConfig.INDEX.myCompanyDrivers.name);
      };
    }
  });