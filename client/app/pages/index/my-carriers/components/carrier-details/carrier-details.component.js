angular.module('echo.index.myCarriers.carrierDetails', [
    'echo.index.myCarriers.driverList',
    'echo.config.routes',
    'echo.api.carrier',
    'echo.components.portalUsers',
    'echo.components.loading',
    'echo.components.portalUserProfile',
    'echo.components.usage',
    'echo.models.user',
    'echo.models.driver',
    'echo.components.driverProfile',
    'echo.api.language'
  ])
  .component('carrierDetails', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-details/carrier-details.template.html',
    bindings: {},
    controller: function($stateParams, $q, carrierApi, routesConfig, languageApi, UserModel, DriverModel) {

      this.getCarrier = function(carrierId) {
        var that = this;

        that.showLoading = true;
        return carrierApi.fetchCarrierById(carrierId).then(function(carrier) {
          that.carrier = carrier;
          if (!that.carrier.isInactive()) {
            $q.all([
              carrierApi.fetchCarrierPortalUsers(carrier.carrierId),
              carrierApi.fetchCarrierDriverCount(carrier.carrierId),
              languageApi.fetchLanguages()
            ]).then(_.spread(function(portalUsers, drivers, languages) {
              that.portalUsers = portalUsers;
              that.driverCount = _.get(drivers, 'userCount');
              that.languages = languages;
              that.showLoading = false;
            }));
          } else {
            that.showLoading = false;
          }
        });
      };

      this.showPortalUserHandler = function(user) {
        this.portalUser = user || new UserModel();
        this.portalUser.carrierId = this.carrierId;
        this.showPortalUser();
      };

      this.showNewDriverProfile = function() {
        this.driver = new DriverModel();
        this.showMode = this.mode.DRIVER;
      };

      this.loadCarrierDetails = function() {
        var that = this;

        that.getCarrier(that.carrierId).then(function() {
          that.showDetailsHandler();
        });
      };

      this.showDetailsHandler = function() {
        this.showMode = this.mode.DETAILS;
      };

      this.showPortalUser = function() {
        this.showMode = this.mode.PORTAL_USER;
      };

      this.$onInit = function() {
        this.mode = {
          DETAILS: 0,
          PORTAL_USER: 1,
          DRIVER: 2
        };
        this.showLoading = false;
        this.isCarrierAdmin = false;
        this.carrierId = $stateParams.carrierId;
        this.usersRoute = routesConfig.INDEX.myCompanyUsers;
        this.driverRoute = routesConfig.INDEX.myCompanyDrivers;
        this.dashboardRoute = routesConfig.INDEX.dashboard;

        this.loadCarrierDetails();
      };
    }
  });
