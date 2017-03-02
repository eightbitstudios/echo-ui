
describe('Component: showMore', function () {
  var component, scope, clickHandler, recordType, pagingModel, showLoading;

  beforeEach(function () {
    module('app/common/components/show-more/show-more.component.html');
    module('echo.components.showMore');
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    clickHandler = jasmine.createSpy('clickHandler');
    recordType = 'Test';
    pagingModel = jasmine.createSpyObj('pagingModel', ['nextOffset']);
    showLoading = false;

    component = $componentController('showMore', null, {
      clickHandler: clickHandler,
      recordType: recordType,
      pagingModel: pagingModel,
      showLoading: showLoading
    });
    component.$onInit();
  }));

  describe('Function: showMoreHandler', function() {
    it('should call next offset', function() {
      component.showMoreHandler();
      expect(pagingModel.nextOffset).toHaveBeenCalled();
    });

    it('should call clickHandler', function() {
      component.showMoreHandler();
      expect(component.clickHandler).toHaveBeenCalled();
    });
  });
});