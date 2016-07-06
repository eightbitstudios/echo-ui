angular.module('echo.index.home', [])

  .component('home', {
    templateUrl: 'app/pages/index/home/home.template.html',
    bindings: {},
    controller: function() {
      this.user = {
        name: 'Mock User'
      };
    }
  });
