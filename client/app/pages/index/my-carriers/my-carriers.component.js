angular.module('echo.index.myCarriers', [])

  .component('myCarriers', {
    templateUrl: 'app/pages/index/my-carriers/my-carriers.template.html',
    bindings: {},
    controller: function() {
      this.user = {
        name: 'Mock User'
      };
    }
  });
