'use strict';

angular.module('echo.directives.analytics', [
  'echo.config.envVars'
]).directive('analytics', function(envVarsConfig) {
  return {
    restrict: 'A',
    link: function() {
      if (envVarsConfig.analytics) {
        var a = envVarsConfig.analytics;
        var c = 'script';
        var d = document.createElement(c);
        d.src = a;
        d.type = 'text/java' + c;
        d.async = true;
        a = document.getElementsByTagName(c)[0];
        a.parentNode.insertBefore(d, a);
      }
    }
  };
});