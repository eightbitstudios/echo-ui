'use strict';

angular.module('echo.components.itemList', []).component('itemList', {
  bindings: {
    items: '<'
  },
  templateUrl: 'app/common/components/item-list/item-list.template.html',
  controller: function() { 
    var that = this;

    that.firstTwoItems = _.slice(that.items, 0, 2);
    that.otherItems = _.slice(that.items, 2, that.items.length);

    that.isOpen = false;
  }
});