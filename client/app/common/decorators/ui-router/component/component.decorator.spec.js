describe('Decorator: Component', function () {
  'use strict';

  var $scope,
    componentDecorator,
    state;

  beforeEach(function () {
    state = {
      self: {},
      path: []
    };
    module('echo.decorators.uiRouter.component');

    inject(function ($rootScope, _componentDecorator_) {
      $scope = $rootScope.$new();
      componentDecorator = _componentDecorator_;
    });
  });

  describe('Function: buildStateView', function () {
    it('should not build view if component property does not exists', function() {
      componentDecorator.buildStateView(state);
      expect(state.self).toEqual({});
    });
        
    it('should build template for view', function() {
      state.self.component = 'test-component';
      componentDecorator.buildStateView(state);
      expect(state.self.template).toEqual('<test-component ></test-component>');
    });

    it('should bind resolves to component', function() {
      state.path = [
        {
          resolve: {
            users: _.noop
          }
        },
        {
          resolve: {
            admins: _.noop
          }
        }
      ];
      state.self.component = 'test-component';
      componentDecorator.buildStateView(state);
      expect(state.self.template).toEqual('<test-component users="$ctrl.users" admins="$ctrl.admins"></test-component>');
    });
    
    it('should inject resolves', function() {
      state.path = [
        {
          resolve: {
            users: _.noop
          }
        },
        {
          resolve: {
            admins: _.noop
          }
        }
      ];
      state.self.component = 'test-component';
      componentDecorator.buildStateView(state);
      expect(state.self.controller.$inject).toEqual(['users', 'admins']);
    });
        
    it('should bind resolve values to controller', function() {
      state.path = [
        {
          resolve: {
            users: [{
              id: 1
            }]
          }
        },
        {
          resolve: {
            admins: {
              id: 3
            }
          }
        }
      ];

      state.self.component = 'test-component';
      componentDecorator.buildStateView(state);
      var users = state.path[0].resolve.users,
      admins = state.path[0].resolve.admins;

      var controller = new state.self.controller(users, admins);
      expect(controller.users).toEqual(users);
      expect(controller.admins).toEqual(admins);
    });
  });
});