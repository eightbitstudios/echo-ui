'use strict';

angular.module('echo.components.itemList', []).component('itemList', {
  bindings: {
    items: '<'
  },
  templateUrl: 'app/common/components/item-list/item-list.template.html',
  controller: function() {
    this.$onInit = function() {
      this.firstTwoItems = _.slice(this.items, 0, 2);
      this.otherItems = _.slice(this.items, 2, this.items.length);
      this.isOpen = false;
    };
  }
});