angular.module('echo.components.modal.assignDriver', [])
  .component('assignDriverModal', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/assign-driver-modal.template.html',
    bindings: {
      modalActions: '<'
    },
    controller: function () {
      var that = this;

      that.pickup = [{
        city: 'New York',
        state: 'New York',
        zip: '60655',
        time: '2016-08-02T16:20:14-05:00'
      }];
      that.delivery = [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: true,
        time: '2016-08-08T16:20:14-05:00'
      }];
    }
  });