
describe('Component: typeaheadSearch', function () {
  var component, $q, driverList, element;

  beforeEach(function () {
    module('app/common/components/typeahead-search/typeahead-search.template.html');
    module('echo.components.typeaheadSearch');
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();

    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();
    component = $componentController('typeaheadSearch', null, {
      onSelectCallback: _.noop,
      searchService: jasmine.createSpy('searchService')
    });
  }));

  describe('Function: onSelect', function () {
    it('should only accept objects', function () {
      component.selection = {
        val: 'test'
      };

      spyOn(component, 'onSelectCallback');
      component.onSelect();
      expect(component.onSelectCallback).toHaveBeenCalledWith({ selection: {
        val: 'test'
      }});
    });

    it('should not accept a value that is not an object', function () {
      component.selection = 'test';

      spyOn(component, 'onSelectCallback');
      component.onSelect();
      expect(component.onSelectCallback).not.toHaveBeenCalled();
    });
  });

  describe('Function: searchServiceHandler', function () {
    it('should call search service with selection', function () {
      var selection = 'test';
      component.searchService.and.returnValue($q.when({}));
      component.searchServiceHandler(selection);
      expect(component.searchService).toHaveBeenCalledWith({ val: selection });
    });

    it('should calculate the number of search results returned', function () {
      var selection = 'test';
      component.searchService.and.returnValue($q.when([1,2,3,4]));
      component.searchServiceHandler(selection);
      scope.$digest();

      expect(component.numberOfSearchResults).toBe(4);
    });
  });

  describe('Function: clearSearchHandler', function () {
    
    it('should clear out selection', function () {
      component.select = 'test';

      component.clearSearchHandler()

      expect(component.selection).toEqual('');
    });
  });
});