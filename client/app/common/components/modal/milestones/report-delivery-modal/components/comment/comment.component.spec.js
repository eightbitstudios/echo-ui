
describe('Component: comment', function () {
  var component, $q, saveCallback, scope;

  beforeEach(function () {
    module('app/common/components/modal/milestones/report-delivery-modal/components/comment/comment.template.html');
    module('echo.components.modal.milestones.reportDelivery.comment');
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();
    saveCallback = jasmine.createSpy('saveCallback');
    
    component = $componentController('comment', null, { 
      saveCallback: saveCallback
    });
  }));

  describe('Function: saveComment', function () {    

    it('should call save callback', function() {
      component.deliveryComment = 'Test';
      component.saveComment();
      expect(saveCallback).toHaveBeenCalledWith({comment: component.deliveryComment});
    });
  });
});