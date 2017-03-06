
describe('Component: Carrier Details', function () {
  var component, scope, $q, carrierApi, $stateParams, languageApi;

  beforeEach(function () {
    module('app/pages/index/my-carriers/components/carrier-details/carrier-details.component.html');
    module('echo.index.myCarriers.carrierDetails', function ($provide) {
      $provide.value('carrierApi', carrierApi = jasmine.createSpyObj('carrierApi', ['fetchCarrierById', 'fetchCarrierPortalUsers', 'fetchCarrierDriverCount']));
      $provide.value('languageApi', languageApi = jasmine.createSpyObj('languageApi', ['fetchLanguages']));
      $provide.value('$stateParams', $stateParams = jasmine.createSpy('$stateParams'));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    $stateParams.carrierId = 1;

    var carrier = {
      carrierName: 'A',
      carrierId: 1,
      isInactive: function () {
        return true;
      }
    };

    var deferred = $q.defer();
    carrierApi.fetchCarrierById.and.returnValue(deferred.promise);
    languageApi.fetchLanguages.and.returnValue($q.when());
    deferred.resolve(carrier);

    scope.$digest();

    component = $componentController('carrierDetails', null, {});
    component.$onInit();
  }));

  describe('Function: getCarrier', function () {
    it('should fetch inactive carrier', function () {
      var carrier = {
        carrierName: 'A',
        carrierId: 1,
        isInactive: function () {
          return true;
        }
      };

      var deferred = $q.defer();
      carrierApi.fetchCarrierById.and.returnValue(deferred.promise);
      component.getCarrier(1);
      deferred.resolve(carrier);

      scope.$digest();

      expect(carrierApi.fetchCarrierById).toHaveBeenCalled();
      expect(carrierApi.fetchCarrierPortalUsers).not.toHaveBeenCalled();
      expect(carrierApi.fetchCarrierDriverCount).not.toHaveBeenCalled();
    });

    it('should fetch active carrier', function () {
      var carrier = {
        carrierName: 'A',
        carrierId: 1,
        isInactive: function () {
          return false;
        }
      };
      var portalUsers = [];
      var drivers = {
        userCount: 5
      };

      var deferred = $q.defer();
      var deferred2 = $q.defer();
      var deferred3 = $q.defer();
      carrierApi.fetchCarrierById.and.returnValue(deferred.promise);
      carrierApi.fetchCarrierPortalUsers.and.returnValue(deferred2.promise);
      carrierApi.fetchCarrierDriverCount.and.returnValue(deferred3.promise);
      component.getCarrier(1);
      deferred.resolve(carrier);
      deferred2.resolve(portalUsers);
      deferred3.resolve(drivers);

      scope.$digest();

      expect(carrierApi.fetchCarrierById).toHaveBeenCalled();
      expect(carrierApi.fetchCarrierPortalUsers).toHaveBeenCalled();
      expect(carrierApi.fetchCarrierDriverCount).toHaveBeenCalled();
      expect(component.portalUsers).toBe(portalUsers);
      expect(component.driverCount).toBe(5);
    });
  });

  describe('Function: showPortalUserHandler', function () {
    it('should default to new user', function () {
      component.showPortalUserHandler(null);

      expect(component.portalUser).toBeDefined();
      expect(component.carrierId).toBe(1);
      expect(component.showMode).toBe(1);
    });

    it('should set user', function () {
      var user = {};
      component.showPortalUserHandler(user);

      expect(component.portalUser).toBe(user);
      expect(component.carrierId).toBe(1);
      expect(component.showMode).toBe(1);
    });
  });

});
