angular.module('echo.components.modal.milestones.addressInfo', [
  'echo.filters.formatCityState'
]).component('addressInfo', {
  templateUrl: 'address-info.component.html',
  bindings: {
    address: '<'
  }
});
