
describe('Component: New Driver', function () {
  var component, scope, $q, carrierId, languageApi, driverApi;

  beforeEach(function () {
    module('app/common/components/modal/assign-driver-modal/components/new-driver/new-driver.template.html');
    module('echo.components.modal.assignDriver.newDriver', function ($provide) {
      $provide.value('languageApi', languageApi = jasmine.createSpyObj('languageApi', ['fetchLanguages']));
      $provide.value('driverApi', driverApi = jasmine.createSpyObj('driverApi', ['insertDriver']));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    carrierId = 1;

    languageApi.fetchLanguages.and.returnValue($q.when({}));

    component = $componentController('newDriver', null, {
      carrierId: carrierId,
      cancelCallback: jasmine.createSpy(),
      continueCallback: jasmine.createSpy()
    });
    component.$onInit();
    scope.$digest();
  }));

  describe('Function: saveNewDriver', function () {
    it('should do nothing without a driver first name', function () {
      component.saveNewDriver();

      expect(component.showLoading).toBeFalsy();
    });

    it('should do nothing without a driver phone', function () {
      component.newDriver.firstName = 'Test';
      component.saveNewDriver();

      expect(component.showLoading).toBeFalsy();
    });

    it('should save new driver', function () {
      var deferred = $q.defer();
      driverApi.insertDriver.and.returnValue(deferred.promise);
      component.newDriver.firstName = 'Test';
      component.newDriver.phone = '3128881234';
      component.saveNewDriver();
      deferred.resolve({ id: 54321 });

      scope.$digest();

      expect(driverApi.insertDriver).toHaveBeenCalledWith(carrierId, component.newDriver);
      expect(component.continueCallback).toHaveBeenCalled();
    });
  });

  describe('Function: $onInit', function () {
    it('should fetch languages', function () {
      var deferred = $q.defer();
      languageApi.fetchLanguages.and.returnValue(deferred.promise);
      component.$onInit();
      var languages = ['English', 'Spanish', 'Other'];
      deferred.resolve(languages);

      scope.$digest();

      expect(languageApi.fetchLanguages).toHaveBeenCalled();
      expect(component.languages).toBe(languages);
    })
  });

});
