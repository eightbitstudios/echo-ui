
describe('Component: Error Messages', function () {
  var component, $q, scope;

  beforeEach(function () {
    module('app/common/components/modal/components/error-messages/error-messages.template.html');
    module('echo.components.modal.errorMessages', function () {});
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    component = $componentController('errorMessages', null, {});
  }));

  describe('Function: showErrorMessages', function () {
    it('should return false with invalid inputs', function () {
      component.errorCode = 1;
      component.errorMessages = null;

      var result = component.showErrorMessages();

      expect(result).toBe(false);
    });

    it('should return false with invalid errorMessages only', function () {
      component.errorCode = 500112;
      component.errorMessages = null;

      var result = component.showErrorMessages();

      expect(result).toBe(false);
    });

    it('should return true with valid error code, non-step sensitive', function () {
      component.errorCode = 500;
      component.errorMessages = null;

      var result = component.showErrorMessages();

      expect(result).toBe(true);
    });

    it('should return true with custom error code and valid messages, non-step sensitive', function () {
      component.errorCode = 500112;
      component.errorMessages = ['Test error message'];

      var result = component.showErrorMessages();

      expect(result).toBe(true);
    });

    it('should return true with custom error code and valid messages, step sensitive', function () {
      component.errorCode = 500112;
      component.errorMessages = ['Test error message'];
      component.stepSensitive = true;
      component.validStep = 2;
      component.currentStep = 2;

      var result = component.showErrorMessages();

      expect(result).toBe(true);
    });

    it('should return false with custom error code and valid messages, step sensitive', function () {
      component.errorCode = 500112;
      component.errorMessages = ['Test error message'];
      component.stepSensitive = true;
      component.validStep = 2;
      component.currentStep = 1;

      var result = component.showErrorMessages();

      expect(result).toBe(false);
    });
  });

  describe('Function: determineErrorMessages', function () {
    it('should return the mapped error code', function () {
      component.errorCode = 500100;

      var result = component.determineErrorMessages();

      expect(result.length).toBe(1);
      expect(result[0]).toBe('Unable to change current password');
    });

    it('should return the custom error code', function () {
      component.errorCode = 500112;
      component.errorMessages = ['Test error message', 'Second test error message'];

      var result = component.determineErrorMessages();

      expect(result.length).toBe(2);
      expect(result[0]).toBe('Test error message');
      expect(result[1]).toBe('Second test error message');
    });

    it('should return the default message', function () {
      component.errorCode = 1;
      component.errorMessages = ['Test error message', 'Second test error message'];

      var result = component.determineErrorMessages();

      expect(result.length).toBe(1);
      expect(result[0]).toBe('An error occurred. Please contact us.');
    });
  });
});
