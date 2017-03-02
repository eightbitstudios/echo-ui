angular.module('echo.index.carrier.loadManagement.loadsFilter', [
  'echo.components.filterButton'
]).component('loadsFilter', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/loads-filter/loads-filter.template.html',
  bindings: {
    filterText: '<',
    loadCount: '<'
  },
  transclude: true
});