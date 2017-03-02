
describe('Component: myCompanyDriverProfile', function () {
  var scope, $q, $componentController, $stateParams, component, store$, routesConfig, carrierId, routesConfig, $state, DriverModel, driverApi, languageApi;

  beforeEach(function () {
    module('app/pages/index/carrier/components/my-company/components/my-company-driver-profile/my-company-driver-profile.template.html');
    module('echo.index.carrier.myCompany.driverProfile', function ($provide) {
      $provide.value('$state', $state = jasmine.createSpyObj('$state', ['go']));
      $provide.value('$stateParams', $stateParams = {});
      $provide.value('DriverModel', DriverModel = jasmine.createSpy('DriverModel'));
      $provide.value('driverApi', driverApi = jasmine.createSpyObj('driverApi', ['fetchDriverById']));
      $provide.value('languageApi', languageApi = jasmine.createSpyObj('languageApi', ['fetchLanguages']));
      $provide.value('store$', store$ = jasmine.createSpyObj('store$', ['getState']));
      $provide.constant('routesConfig', routesConfig = {
        INDEX: {
          myCompanyDrivers: {
            name: 'drivers'
          }
        }
      });
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, _$componentController_) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $stateParams.driverId = 1;
    carrierId = 2;
    scope.$digest();

    store$.getState.and.returnValue({ carrier: {carrierId: carrierId} });

    $componentController = _$componentController_;

  }));

  describe('Function: $onInit', function () {
    var driverDefer,
      languageDefer;

    beforeEach(function () {
      driverDefer = $q.defer();
      languageDefer = $q.defer();
      driverApi.fetchDriverById.and.returnValue(driverDefer.promise);
      languageApi.fetchLanguages.and.returnValue(languageDefer.promise);
    });

    describe('driver id', function () {

      beforeEach(function () {
        component = $componentController('myCompanyDriverProfile', null, { carrierId: carrierId, driverId: $stateParams.driverId });
      });

      it('should call fetch driver by id', function () {
        driverDefer.resolve();
        component.$onInit();
        scope.$digest();
        expect(driverApi.fetchDriverById).toHaveBeenCalledWith(carrierId, $stateParams.driverId);
      });

      it('should call language api', function () {
        languageDefer.resolve();
        component.$onInit();
        scope.$digest();
        expect(languageApi.fetchLanguages).toHaveBeenCalled();
      });

      it('should set driver and language', function () {
        var driver = {
          id: 1
        }, languages = ['English'];

        languageDefer.resolve(languages);
        driverDefer.resolve(driver);
        component.$onInit();
        scope.$digest();

        driverDefer.promise.then(function () {
          expect(component.driver).toEqual(driver);
          expect(component.languages).toEqual(languages);
        });

        scope.$digest();
      });
    });

    describe('no driver id', function () {

      beforeEach(function () {
        component = $componentController('myCompanyDriverProfile', null, { carrierId: carrierId, driverId: null });
      });

      it('should call language api', function () {
        $stateParams.driverId = null;
        languageDefer.resolve();
        component.$onInit();
        scope.$digest();
        expect(languageApi.fetchLanguages).toHaveBeenCalled();
      });
    });
  });

  describe('Function: profileUpdated', function () {
    beforeEach(function () {
      component = $componentController('myCompanyDriverProfile', null, { carrierId: carrierId, driverId: null });
    });
    it('should go to drivers list', function () {
      component.profileUpdated();
      expect($state.go).toHaveBeenCalledWith(routesConfig.INDEX.myCompanyDrivers.name);
    });
  });
});