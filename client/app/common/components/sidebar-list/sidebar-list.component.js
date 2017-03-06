'use strict';

angular.module('echo.components.sidebarList', [])
  .component('sidebarList', {
    bindings: {
      items: '<',
      link: '<',
      searchParam: '=',
      minSearchCharacters: '<'
    },
    templateUrl: 'app/common/components/sidebar-list/sidebar-list.component.html',
    controller: function () {
      
      /**
       * @description Handler for when a sidebar item is selected
       * @param {Object} item - Item this was selected
       */
      this.selectItemHandler = function (item) {
        this.searchParam = '';

        // Set all sidebar items to not be selected
        _(this.items).forEach(function (value) {
          value.selected = false;
        });

        item.selected = true;
      };

      this.mapSidebarItems = function (changesObj) {
        if (changesObj.items) {
          /**
          * Groups a list of carriers by the first letter in their name and maps them to an object.
          */
          this.sidebarList = _(this.items)
            .groupBy(function (item) {
              return item.carrierName.charAt(0);
            }).map(function (value, prop) {
              return {
                values: value,
                letter: prop
              };
            }).value();
        }
      };

      this.$onChanges = this.mapSidebarItems;
    }
  });