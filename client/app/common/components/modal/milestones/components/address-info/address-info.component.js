angular.module('echo.components.modal.milestones.addressInfo', []).component('addressInfo', {
  templateUrl: 'app/common/components/modal/milestones/components/address-info/address-info.template.html',
  bindings: {
    address: '<'
  },
  controller: function () {
    var that = this;

    // Default address to empty object for easier null-checking
    if (!that.address) {
      that.address = {};
    }

    that.formatCityAndState = function () {
      if (that.address.city && that.address.state) {
        return that.address.city + ', ' + that.address.state;
      } else if (that.address.city) {
        return that.address.city;
      } else if (that.address.state) {
        return that.address.state;
      } else {
        return '';
      }
    };
  }
});
