angular.module('echo.index.carrier.loadManagement.loadDetails.loadDetail', [
  'echo.index.carrier.loadManagement.loadDetails.loadDetail.proNumber'
])
  .component('loadDetail', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/load-detail/load-detail.template.html',
    bindings: {},
    controller: function () {
      var that = this;
      that.delivery = [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: true,
        time: '2016-08-05T16:20:14-05:00'
      }];
    }
  });
