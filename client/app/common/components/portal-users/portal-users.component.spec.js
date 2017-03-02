
describe('Component: portalUsers', function () {
  var scope, portalUsers, clickHandler, component;

  beforeEach(function () {
    module('app/common/components/portal-users/portal-users.template.html');
    module('echo.components.portalUsers');
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    portalUsers = [{
      id: 1
    }];
    clickHandler = jasmine.createSpy('clickHandler');
    scope.$digest();

    component = $componentController('portalUsers', null, {
      portalUsers: portalUsers,
      clickHandler: clickHandler
    });
  }));

  describe('Function: userTileClickHandler', function () {
    it('should call click handler with selected portal user', function () {
      component.userTileClickHandler(portalUsers[0]);
      expect(clickHandler).toHaveBeenCalledWith({
        user: portalUsers[0]
      });
    });
  });

  describe('Function: addTileHandler', function () {
    it('should call click handler with no portal user', function () {
      component.addTileHandler();
      expect(clickHandler).toHaveBeenCalledWith({
        user: null
      });
    });
  });
});