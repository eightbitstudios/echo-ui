
describe('Component: confirmItems', function () {
  var component, $q, scope, pickupNumbers;

  beforeEach(function () {
    module('confirm-items.component.html');
    module('echo.components.modal.milestones.reportLoaded.confirmItems');
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();
    pickupNumbers = ['123', '423'];
    component = $componentController('confirmItems', null, {
      pickupNumbers: pickupNumbers
    });
    component.$onInit();
  }));

  describe('Function: init', function () {    
    it('should format pickupNumbers', function() {
      expect(component.formattedPickupNumbers).toEqual('123, 423');
    });
  });
});