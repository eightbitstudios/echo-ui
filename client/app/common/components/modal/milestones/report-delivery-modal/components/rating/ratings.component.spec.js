
describe('Component: rating', function () {
  var component, $q, scope;

  beforeEach(function () {
    module('app/common/components/modal/milestones/report-delivery-modal/components/rating/rating.component.html');
    module('echo.components.modal.milestones.rating');
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();

    component = $componentController('rating', null, {});
    component.$onInit();
  }));

  describe('Function: init', function () {    
    it('should create component', function() {
      expect(component).toBeDefined();
    });
  });
});