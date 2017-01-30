angular.module('echo.actions.actionDispatcher', [
  'echo.action'
]).factory('actionDispatcher', function(Rx, action$) {
  return function(args) {
      action$.onNext(args);
      if (Rx.Observable.isObservable(args.payload)){
        args.payload.source.subscribe(function(data) {
          action$.onNext(data);
        });
      }
      return args;
    };
});