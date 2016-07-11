'use strict';

angular.module('echo.components.sidebarList', [])
  .component('sidebarList', {
    bindings: {
      items: '=',
      link: '='
    },
    templateUrl: 'app/common/components/sidebar-list/sidebar-list.template.html',
    controller: function () {
      var that = this;

      /**
       * @description Handler for when a sidebar item is selected
       * @param {Object} item - Item that was selected
       */
      that.selectItemHandler = function (item) {

       // Set all sidebar items to not be selected
        _(that.items).forEach(function (sideBarItem) {
          _(sideBarItem.values).forEach(function (value) {
            value.selected = false;
          });
        });

        item.selected = true;
      };
    }
  });