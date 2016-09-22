angular.module('echo.decorators.uiRouter', [
  'ui.router',
  'echo.decorators.uiRouter.component'
])
  .config(function ($stateProvider, componentDecoratorProvider) {
    var componentDecorator = componentDecoratorProvider.$get();
    /**
     * Custom component decorator for ui-router
     */
    $stateProvider.decorator('component', componentDecorator.buildStateView);
  });