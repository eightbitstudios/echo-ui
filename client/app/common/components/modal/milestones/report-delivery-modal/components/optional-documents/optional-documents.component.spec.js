
describe('Component: reportDeliveryOptionalDocuments', function () {
  var component, $q, saveCallback, scope;

  beforeEach(function () {
    module('app/common/components/modal/milestones/report-delivery-modal/components/optional-documents/optional-documents.template.html');
    module('echo.components.modal.milestones.reportDelivery.optionalDocuments');
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();

    component = $componentController('reportDeliveryOptionalDocuments', null, {});
    component.$onInit();
  }));

  describe('Function: addComment', function () {    
    it('should show comment', function() {
      component.addComment();
      expect(component.buttonsDisabled).toBeTruthy();
      expect(component.currentStep).toEqual(component.modes.comment);
    });
  });

  describe('Function: exitComment', function () {    
    it('should exit comment section', function() {
      component.exitComment();
      expect(component.buttonsDisabled).toBeFalsy();
      expect(component.currentStep).toEqual(component.modes.documents);
    });
  });

  describe('Function: saveComment', function () {    
    it('should exit comment section', function() {
      var comment = 'test';
      spyOn(component, 'exitComment');
      component.saveComment(comment);
      expect(component.comment).toEqual(comment);
      expect(component.exitComment).toHaveBeenCalled();
    });
  });
});