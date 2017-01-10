
describe('Component: tabBar', function () {
  var component, scope, tabItems, $state, tabReplacementText;

  beforeEach(function () {
    module('app/common/components/tab-bar/tab-bar.template.html');
    module('echo.components.tabBar', function ($provide) {
      $provide.value('$state', $state = {
        id: 1
      });
    });

    inject(function ($rootScope, $compile, $componentController) {
      scope = $rootScope.$new();
      scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };
      tabItems = jasmine.createSpy('clickHandler');
      tabReplacementText = 'Test';

      component = $componentController('tabBar', null, {
        tabItems: tabItems,
        tabReplacementText: tabReplacementText
      });
      component.$onInit();
    });
  });

  it('should set state', function () {
    expect(component.state).toEqual($state);
  });
});