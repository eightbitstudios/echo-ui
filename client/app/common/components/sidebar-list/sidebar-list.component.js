'use strict';

angular.module('echo.components.sidebarList', [])
  .component('sidebarList', {
    bindings: {
      items: '<',
      link: '<',
      searchParam: '<',
      minSearchCharacters: '<'
    },
    templateUrl: 'app/common/components/sidebar-list/sidebar-list.template.html',
    controller: function () {
      var that = this;
      /**
       * Groups a list of carriers by the first letter in their name and maps them to an object.
       */
      that.sidebarList = _(that.items)
        .groupBy(function (item) {
          return item.carrierName.charAt(0);
        }).map(function (value, prop) {
          return {
            values: value,
            letter: prop
          };
        }).value();

      /**
       * @description Handler for when a sidebar item is selected
       * @param {Object} item - Item that was selected
       */
      that.selectItemHandler = function (item) {

        // Set all sidebar items to not be selected
        _(that.items).forEach(function (value) {
          value.selected = false;
        });

        item.selected = true;
      };
    }
  });