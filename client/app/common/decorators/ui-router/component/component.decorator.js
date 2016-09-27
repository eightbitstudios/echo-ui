angular.module('echo.decorators.uiRouter.component', [])
  .factory('componentDecorator', function () {
    return {
      /**
       * Builds view and controller for ui router state
       * @param {UIRouter.state} state
       */
      buildStateView: function (state) {
        if (state.self.component) {

          state.self.controllerAs = '$ctrl';

          /**
           * Grabs all resolve property keys from the state object.
           * example - ['carrierId', 'portalUsers']
           */
          var resolve = _(state.path).map(function (value) {
            return _.keys(value.resolve);
          }).flatten().value();

          /**
           * Builds out a template for a component
           * @example <portal-users user="$ctrl.users"/>
           */
          state.self.template = _.template('<${component} ${bindings}></${component}>')({
            component: state.self.component,
            bindings: _(resolve).map(function (value) {
              return _.template('${bindingName}="${ctrlName}.${binding}"')({
                bindingName: _.kebabCase(value),
                binding: value,
                ctrlName: state.self.controllerAs
              });
            }).join(' ') || ''
          });

          /**
           * Control for component template. This allows the component to have access to all of the resolve dependencies
           */
          state.self.controller = _.rest(function (dependencies) {
            _.assign(this, _.zipObject(resolve, dependencies));
          });

          // Inject all resolve dependencies
          state.self.controller.$inject = resolve;
        }
      }
    };
  });