
describe('Component: Driver Profile', function () {
  var component, scope, $q, component, $componentController, carrierId, driver, languages, profileUpdatedHandler, driverApi;

  beforeEach(function () {
    module('app/common/components/driver-profile/driver-profile.template.html');
    module('echo.components.driverProfile', function($provide){
      $provide.value('driverApi', driverApi = jasmine.createSpyObj('driverApi', ['upsertDriver', 'deactivateDriverById']));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, _$componentController_, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    carrierId = 1;
    driver = {
      preferredLanguage: 'English'
    };
    languages = [{
      language: 'English'
    }, {
        language: 'Spanish'
      }];
    profileUpdatedHandler = jasmine.createSpy('profileUpdatedHandler');

    $componentController = _$componentController_
  }));

  it('should set other language', function () {
    driver.preferredLanguage = 'German';

    component = $componentController('driverProfile', null, {
      carrierId: carrierId,
      driver: driver,
      languages: languages,
      profileUpdatedHandler: profileUpdatedHandler
    });

    expect(component.driver.otherLanguage).toEqual('German');
  });
  describe('Function: saveDriverHandler', function () {

    beforeEach(function () {
      component = $componentController('driverProfile', null, {
        carrierId: carrierId,
        driver: driver,
        languages: languages,
        profileUpdatedHandler: profileUpdatedHandler
      });
      component.driverProfileForm = {};
    });

    it('should not save profile if form is not valid', function () {
      component.driverProfileForm.$valid = false;
      component.saveDriverHandler();
      expect(driverApi.upsertDriver).not.toHaveBeenCalled();
    });

    it('should save profile if form is valid', function () {
      component.driverProfileForm.$valid = true;
      driverApi.upsertDriver.and.returnValue($q.defer().promise);
      component.saveDriverHandler();

      expect(driverApi.upsertDriver).toHaveBeenCalledWith(carrierId, component.driver);
    });

    it('should call profile update handler on success', function () {
      component.driverProfileForm.$valid = true;
      driverApi.upsertDriver.and.returnValue($q.when());
      component.saveDriverHandler();

      scope.$digest();

      expect(component.profileUpdatedHandler).toHaveBeenCalled();
    });

    it('should set server error message on failure', function () {
      component.driverProfileForm.$valid = true;
      var error = 'error message';
      driverApi.upsertDriver.and.returnValue($q.reject(error));
      component.saveDriverHandler();

      scope.$digest();

      expect(component.serverError).toEqual(error);
    });
  });

  describe('Function: toggleConfirmation', function () {

    beforeEach(function () {
      component = $componentController('driverProfile', null, {
        carrierId: carrierId,
        driver: driver,
        languages: languages,
        profileUpdatedHandler: profileUpdatedHandler
      });
    });

    it('should toggle showConfirmation', function() {
      component.toggleConfirmation();

      expect(component.showConfirmation).toBeTruthy();
    });
  });

  describe('Function: removeUserHandler', function () {

    beforeEach(function () {
      component = $componentController('driverProfile', null, {
        carrierId: carrierId,
        driver: driver,
        languages: languages,
        profileUpdatedHandler: profileUpdatedHandler
      });
    });

    it('should call service to deactivate user', function() {
      driverApi.deactivateDriverById.and.returnValue($q.defer().promise);
      component.removeUserHandler();

      expect(driverApi.deactivateDriverById).toHaveBeenCalledWith(carrierId, component.driver);
    });

    it('should call profile update handler on success', function() {
      driverApi.deactivateDriverById.and.returnValue($q.when());
      component.removeUserHandler();
      scope.$digest();
      expect(component.profileUpdatedHandler).toHaveBeenCalled();
    });
  });
});
