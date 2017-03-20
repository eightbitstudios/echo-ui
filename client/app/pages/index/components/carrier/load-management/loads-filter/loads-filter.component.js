angular.module('echo.index.carrier.loadManagement.loadsFilter', [
  'echo.components.filterButton'
]).component('loadsFilter', {
  templateUrl: 'loads-filter.component.html',
  bindings: {
    filterText: '<',
    loadCount: '<'
  },
  transclude: true
});