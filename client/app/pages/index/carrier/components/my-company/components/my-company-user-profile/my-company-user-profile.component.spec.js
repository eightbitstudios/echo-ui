
describe('Component: myCompanyPortalUsers', function () {
  var scope, $q, component, userProfileService, carrierId, PasswordChangeModel, portalUser, goBackHandler, reloadPortalHandler, showLoading;

  beforeEach(function () {
    module('app/pages/index/carrier/components/my-company/components/my-company-user-profile/my-company-user-profile.template.html');
    module('echo.index.carrier.myCompany.userProfile', function ($provide) {
      $provide.value('userProfileService', userProfileService = jasmine.createSpyObj('userProfileService', ['getUser']));
      $provide.value('PasswordChangeModel', PasswordChangeModel = jasmine.createSpy('PasswordChangeModel'));
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    carrierId = 2;
    portalUser = {
      id: 1
    };
    goBackHandler = jasmine.createSpy('goBackHandler');
    reloadPortalHandler = jasmine.createSpy('reloadPortalHandler');
    showLoading = false;

    scope.$digest();

    component = $componentController('myCompanyUserProfile', null, {       
      portalUser: portalUser,
      goBackHandler: goBackHandler,
      reloadPortalHandler: reloadPortalHandler,
      showLoading: showLoading,
      carrierId: carrierId
    });
  }));

  describe('Function: goBackToPortal', function() {
    it('should call go back handler', function() {
      component.goBackToPortal();
      expect(goBackHandler).toHaveBeenCalled();
    });
  });

  describe('Function: userProfileUpdated', function() {
    it('should call reload portal handler', function() {
      component.userProfileUpdated();
      expect(reloadPortalHandler).toHaveBeenCalled();
    });
  });
});