
describe('Component: searchBar', function () {
  var scope, searchCallback, appConstants, keyCodes, component;

  beforeEach(function () {
    module('search-bar.component.html');
    module('echo.components.searchBar', function ($provide) {
      $provide.constant('keyCodes', keyCodes = {
        ENTER: 'enter'
      });
      $provide.constant('appConstants', appConstants = {
        MIN_SEARCH_CHARACTERS: {
          loads: 3
        }
      });
    });

    inject(function ($rootScope, $compile, $componentController) {
      scope = $rootScope.$new();
      scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      searchCallback = jasmine.createSpy('searchCallback');
      scope.$digest();

      component = $componentController('searchBar', null, {
        searchCallback: searchCallback
      });
    });
  });

  describe('Function: $onInit', function () {
    it('should clear out search text', function () {
      component.$onInit();
      expect(component.searchText).toEqual('');
    });
  });

  describe('Function: toggleFocus', function () {
    it('should focus on search text', function () {
      component.toggleFocus();
      expect(component.focused).toBeTruthy();
    });
  });

  describe('Function: searchHandler', function () {
    it('should call search callback', function () {
      component.searchText = 'Test123';
      component.searchHandler();
      expect(component.searchCallback).toHaveBeenCalled();
    });

    it('should not call search callback if search text is not valid', function () {
      component.searchText = 'T';
      component.searchHandler();
      expect(component.searchCallback).not.toHaveBeenCalled();
    });
  });

  describe('Function: searchKeyDown', function () {
    beforeEach(function () {
      spyOn(component, 'searchHandler');
    });

    it('should call searchHandler on enter', function () {
      component.searchKeyDown({
        keyCode: keyCodes.ENTER
      });

      expect(component.searchHandler).toHaveBeenCalled();
    });

    it('should not call searchHandler', function () {
      component.searchKeyDown({
        keyCode: ''
      });

      expect(component.searchHandler).not.toHaveBeenCalled();
    });
  });
});