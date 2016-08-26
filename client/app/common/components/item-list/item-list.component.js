'use strict';

angular.module('echo.components.itemList', []).component('itemList', {
  bindings: {},
  templateUrl: 'app/common/components/item-list/item-list.template.html',
  controller: function() { 
    var that = this;

    that.isOpen = false;
  }
});