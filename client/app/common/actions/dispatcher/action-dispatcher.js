angular.module('echo.actions.actionDispatcher', [
  'echo.actions',
  'echo.config.globals'
]).factory('actionDispatcher', function(Rx, action$) {
  /**
   * @description Dispatches an action to the store. 
   */
  return function(args) {
      action$.onNext(args); // Send action to the store
      if (Rx.Observable.isObservable(args.payload)){
        // Wait till observarble emits data to execute next action
        args.payload.source.subscribe(function(data) {
          action$.onNext(data); // Send emitted data to the store
        });
      }
      return args;
    };
});