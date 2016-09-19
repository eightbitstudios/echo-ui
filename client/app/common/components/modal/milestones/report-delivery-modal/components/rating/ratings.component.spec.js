
describe('Component: rating', function () {
  var component, $q, scope;

  beforeEach(function () {
    module('app/common/components/modal/milestones/report-delivery-modal/components/rating/rating.template.html');
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
  }));

  describe('Function: init', function () {    
    it('should create component', function() {
      expect(component).toBeDefined();
    });
  });
});