angular.module('echo.components.modal.milestones.addressInfo', [
  'echo.filters.formatCityState'
]).component('addressInfo', {
  templateUrl: 'app/common/components/modal/milestones/components/address-info/address-info.component.html',
  bindings: {
    address: '<'
  }
});
