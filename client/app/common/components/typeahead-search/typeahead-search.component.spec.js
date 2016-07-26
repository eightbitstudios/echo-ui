
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

    carrierService.fetchDrivers.and.returnValue($q.when({}));
    component = $componentController('typeaheadSearch', null, {});
  }));

  describe('Function: onSelect', function () {

  });

  describe('Function: searchServiceHandler', function () {
    
  });

  describe('Function: clearSearchHandler', function () {
    
  });
});