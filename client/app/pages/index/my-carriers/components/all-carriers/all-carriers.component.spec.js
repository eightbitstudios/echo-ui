describe('Component: All Carriers', function() {
  var component, scope, $q, carrierApi, $stateParams, carriers, store$;

  beforeEach(function() {
    module('app/pages/index/my-carriers/components/all-carriers/all-carriers.component.html');
    module('echo.index.myCarriers.allCarriers', function($provide) {
      $provide.value('carrierApi', carrierApi = jasmine.createSpyObj('carrierApi', ['fetchCarriers']));
      $provide.value('$stateParams', $stateParams = jasmine.createSpy('$stateParams'));
      $provide.value('store$',
        store$ = jasmine.createSpyObj('store$', ['getState']));
    });
  });

  beforeEach(inject(function($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    carriers = [{
      carrierName: 'B',
      carrierId: 2
    }, {
      carrierName: 'A',
      carrierId: 1
    }, {
      carrierName: 'D',
      carrierId: 4
    }, {
      carrierName: 'C',
      carrierId: 3
    }];

    store$.getState.and.returnValue({
      user: {
        userId: 100
      }
    });

    var deferred = $q.defer();
    carrierApi.fetchCarriers.and.returnValue(deferred.promise);
    deferred.resolve(carriers);

    scope.$digest();

    component = $componentController('allCarriers', null, {});
    component.$onInit();
  }));

  describe('Function: selectCarrier', function() {
    it('should select carrier A (id: 1)', function() {
      component.selectCarrier(carriers, '1');

      expect(carriers[1].selected).toBe(true);
    });

    it('should select carrier B (id: 2)', function() {
      component.selectCarrier(carriers, '2');

      expect(carriers[0].selected).toBe(true);
    });

    it('should select carrier C (id: 3)', function() {
      component.selectCarrier(carriers, '3');

      expect(carriers[3].selected).toBe(true);
    });

    it('should select carrier D (id: 4)', function() {
      component.selectCarrier(carriers, '4');

      expect(carriers[2].selected).toBe(true);
    });

    it('should select no carrier', function() {
      component.selectCarrier(carriers, '5');

      expect(carriers[0].selected).toBeUndefined();
      expect(carriers[1].selected).toBeUndefined();
      expect(carriers[2].selected).toBeUndefined();
      expect(carriers[3].selected).toBeUndefined();
    });
  });

});