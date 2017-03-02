
describe('Component: filterBar', function () {
  var scope, component, searchList, link, searchParam, minSearchCharacters;

  beforeEach(function () {
    module('app/common/components/filter-bar/filter-bar.template.html');
    module('echo.components.filterBar');
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    searchList = [{
      selected: true
    }];
    link = 'test';
    searchParam = 'test';
    minSearchCharacters = 3;

    scope.$digest();

    component = $componentController('filterBar', null, {
      searchList: searchList,
      link: link,
      searchParam: searchParam,
      minSearchCharacters: minSearchCharacters
    });
  }));

  describe('Function: searchItemSelected', function () {
    beforeEach(function () {
      spyOn(component, 'clearSearchHandler');
    });

    it('should select item', function () {
      var item = {
        selected: false
      };
      component.searchItemSelected(item);
      expect(item.selected).toBeTruthy();
    });

    it('should clear other selected items', function () {
      component.searchItemSelected({});
      expect(searchList[0].selected).toBeFalsy();
    });

    it('should clear search param', function () {
      component.searchItemSelected({});
      expect(component.clearSearchHandler).toHaveBeenCalled();
    });
  });

  describe('Function: clearSearchHandler', function () {
    it('should clear search param', function () {
      component.clearSearchHandler();
      expect(component.searchParam).toEqual('');
    });
  });
});