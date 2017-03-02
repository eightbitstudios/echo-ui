
describe('Component: Pro Number', function () {
  var component, scope, $q, proNumber, loadGuid, loadsApi;

  beforeEach(function () {
    module('app/pages/index/carrier/components/load-management/components/load-details/components/load-detail/components/pro-number/pro-number.component.html');
    module('echo.index.carrier.loadManagement.loadDetails.loadDetail.proNumber', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['updateProNumber']));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    proNumber = 1;
    loadGuid = '4gf65weg67h8fg63574gwe7hg3t7aeryb';

    component = $componentController('proNumber', null, {
      proNumber: proNumber,
      loadGuid: loadGuid
    });
  }));

  describe('Function: updateProNumber', function () {
    it('should update pro number', function () {
      var newProNumber = 87324354;

      var deferred = $q.defer();
      loadsApi.updateProNumber.and.returnValue(deferred.promise);
      component.updateProNumber(newProNumber);
      deferred.resolve({ proNumber: newProNumber });

      scope.$digest();

      expect(loadsApi.updateProNumber).toHaveBeenCalledWith(loadGuid, { proNumber: newProNumber });
      expect(component.proNumber).toBe(newProNumber);
    });
  });

});
