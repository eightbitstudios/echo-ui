
describe('Component: myCompanyPortalUsers', function () {
  var scope, $q, component, UserModel, carrierId, carrierApi;

  beforeEach(function () {
    module('app/pages/index/carrier/components/my-company/components/my-company-portal-users/my-company-portal-users.template.html');
    module('echo.index.carrier.myCompany.portalUsers', function ($provide) {
      $provide.value('carrierApi', carrierApi = jasmine.createSpyObj('carrierApi', ['fetchCarrierPortalUsers']));
      $provide.value('UserModel', UserModel = jasmine.createSpy('UserModel'));
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    carrierId = 2;
    scope.$digest();

    component = $componentController('myCompanyPortalUsers', null, { carrierId: carrierId });
  }));

  describe('Function: getCarrierPortalUsers', function() {
    var portalUsersDefer;
    beforeEach(function() {
      portalUsersDefer = $q.defer();
      carrierApi.fetchCarrierPortalUsers.and.returnValue(portalUsersDefer.promise);
    });

    it('should call fetch carrier portal users',  function() {
      component.getCarrierPortalUsers();
      expect(carrierApi.fetchCarrierPortalUsers).toHaveBeenCalledWith(carrierId);
    });

    it('should set portalUsers',  function(done) {
      var portalUsers = [{id: 1}];
      portalUsersDefer.resolve(portalUsers);
      component.getCarrierPortalUsers();

      portalUsersDefer.promise.then(function() {
        expect(component.portalUsers).toEqual(portalUsers);
        done();
      });

      scope.$digest();
    });
  });
});