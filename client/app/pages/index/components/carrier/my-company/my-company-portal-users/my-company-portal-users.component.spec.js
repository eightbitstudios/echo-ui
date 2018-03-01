describe('Component: myCompanyPortalUsers', function() {
  var scope, $q, component, UserModel, carrierId, carrierApi, store$;

  beforeEach(function() {
    module('my-company-portal-users.component.html');
    module('echo.index.carrier.myCompany.portalUsers', function($provide) {
      $provide.value('carrierApi', carrierApi = jasmine.createSpyObj('carrierApi', ['fetchCarrierPortalUsers']));
      $provide.value('UserModel', UserModel = jasmine.createSpy('UserModel'));
      $provide.value('store$', store$ = jasmine.createSpyObj('store$', ['getState']));
    });
  });

  beforeEach(inject(function($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    carrierId = 2;
    scope.$digest();

    store$.getState.and.returnValue({ carrier: {carrierId: carrierId} });
    
    component = $componentController('myCompanyPortalUsers', null, {});
    spyOn(component, 'getCarrierPortalUsers');
    component.getCarrierPortalUsers.and.callFake(function() {});
    component.$onInit();
  }));

  describe('Function: $onInit', function() {
    it('should call getCarrierPortalUsers', function() {
      component.$onInit();
      expect(component.getCarrierPortalUsers).toHaveBeenCalled();
    });
  });

  describe('Function: getCarrierPortalUsers', function() {
    var portalUsersDefer;
    beforeEach(function() {
      component.getCarrierPortalUsers.and.callThrough();
      portalUsersDefer = $q.defer();
      carrierApi.fetchCarrierPortalUsers.and.returnValue(portalUsersDefer.promise);
    });

    it('should call fetch carrier portal users', function() {
      component.getCarrierPortalUsers();
      expect(carrierApi.fetchCarrierPortalUsers).toHaveBeenCalledWith(carrierId);
    });

    it('should set portalUsers', function(done) {
      var portalUsers = [{
        id: 1
      }];
      portalUsersDefer.resolve(portalUsers);
      component.getCarrierPortalUsers();

      portalUsersDefer.promise.then(function() {
        expect(component.portalUsers).toEqual(portalUsers);
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: userTileClickHandler', function() {

    it('should set portal user', function() {
      var user = {
        id: 1
      };

      UserModel.and.returnValue(user);
      component.userTileClickHandler(user);
      expect(component.portalUser).toEqual({
        id: user.id,
        carrierId: carrierId
      });
    });

    it('should create empty portal user', function() {

      UserModel.and.returnValue({});
      component.userTileClickHandler();
      expect(component.portalUser).toEqual({
        carrierId: carrierId
      });
    });
  });

  describe('Function: showUsersPortal', function() {
    it('should show portal users page', function() {
      component.showUsersPortal()
      expect(component.showMode).toEqual(component.mode.USERS_PORTAL);
    });
  });

  describe('Function: reloadUsersPortal', function() {
    beforeEach(function() {
      spyOn(component, 'showUsersPortal');
    });

    it('should call getCarrierPortalUsers', function() {
      component.reloadUsersPortal();
      expect(component.getCarrierPortalUsers).toHaveBeenCalled();
    });

    it('should call showUsersPortal', function() {
      component.reloadUsersPortal();
      expect(component.showUsersPortal).toHaveBeenCalled();
    });
  });
});