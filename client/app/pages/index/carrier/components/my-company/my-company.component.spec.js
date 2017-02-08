
describe('Component: myCompany', function () {
  var scope, component, store$, routesConfig;

  beforeEach(function () {
    module('app/pages/index/carrier/components/my-company/my-company.template.html');
    module('echo.index.carrier.myCompany', function ($provide) {
      $provide.value('store$', store$ = jasmine.createSpyObj('store$', ['getState']));
      $provide.value('$stateParams', {});
      $provide.value('$state', {});
      $provide.constant('routesConfig', routesConfig = {
        INDEX: {
          myCompanyUsers: {
            name: 'users'
          },
          myCompanyDrivers: {
            name: 'drivers'
          }
        }
      });
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController) {
    scope = $rootScope.$new();

    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();

    store$.getState.and.returnValue({ carrier: {carrierId: 1} });

    component = $componentController('myCompany', null, { });
  }));

  describe('Function: $onInit', function () {
    it('should set tab items', function () {
      component.$onInit();
      expect(component.tabItems).toEqual([{
        title: 'Portal Users',
        link: routesConfig.INDEX.myCompanyUsers.name,
        icon: 'icon-portal-user'
      }, {
          title: 'Drivers',
          link: routesConfig.INDEX.myCompanyDrivers.name,
          icon: 'icon-driver'
        }])
    });
  });

});