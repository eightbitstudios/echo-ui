'use strict';

angular.module('echo.components.alphabeticalList', [])
.component('alphabeticalList', {
  bindings: {
    items: '='
  },
  templateUrl: 'app/common/components/alphabetical-list/alphabetical-list.template.html',
  controller: function(){}
});