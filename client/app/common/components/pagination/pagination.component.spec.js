
describe('Component: pagination', function () {
  var scope, recordType, pageClickHandler, pagingModel, onlyShowCurrentPage, component;

  beforeEach(function () {
    module('app/common/components/pagination/pagination.template.html');
    module('echo.components.pagination');
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    pageClickHandler = jasmine.createSpy('pageClickHandler');
    recordType = 'Test';
    pagingModel = jasmine.createSpyObj('pagingModel', ['previousPage', 'nextPage', 'setPage']);
    onlyShowCurrentPage = false;
    pagingModel.totalRecords = 10;
    pagingModel.limit = 5;

    scope.$digest();

    component = $componentController('pagination', null, {
      pageClickHandler: pageClickHandler,
      recordType: recordType,
      pagingModel: pagingModel,
      onlyShowCurrentPage: onlyShowCurrentPage
    });
  }));

  describe('Function: previousPage', function () {
    it('should not call previous page if selected page is 1', function () {
      pagingModel.selectedPage = 1;
      component.previousPage();
      expect(pagingModel.previousPage).not.toHaveBeenCalled();
    });
        
    it('should call previous page', function () {
      pagingModel.selectedPage = 2;
      component.previousPage();
      expect(pagingModel.previousPage).toHaveBeenCalled();
    });

    it('should call page click handler', function () {
      pagingModel.selectedPage = 2;
      component.previousPage();
      expect(pageClickHandler).toHaveBeenCalled();
    });
  });

  describe('Function: nextPage', function () {
    it('should not call next page if selected page is on the last page', function () {
      pagingModel.selectedPage = 2;
      component.nextPage();
      expect(pagingModel.nextPage).not.toHaveBeenCalled();
    });
        
    it('should call next page', function () {
      pagingModel.selectedPage = 1;
      component.nextPage();
      expect(pagingModel.nextPage).toHaveBeenCalled();
    });

    it('should call page click handler', function () {
      pagingModel.selectedPage = 1;
      component.nextPage();
      expect(pageClickHandler).toHaveBeenCalled();
    });
  });

  describe('Function: pageClick', function () {
    it('should call set page', function () {
      var page = 2;
      component.pageClick(page);
      expect(pagingModel.setPage).toHaveBeenCalledWith(page);
    });
    
    it('should call page click handler', function () {
      component.pageClick();
      expect(pageClickHandler).toHaveBeenCalled();
    });
  });
});