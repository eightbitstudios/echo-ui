
describe('Component: myCompany', function () {
  var scope, component, routesConfig;

  beforeEach(function () {
    module('app/pages/index/carrier/components/my-company/my-company.template.html');
    module('echo.index.carrier.myCompany', function ($provide) {
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

    component = $componentController('myCompany', null, { carrierId: 1 });
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