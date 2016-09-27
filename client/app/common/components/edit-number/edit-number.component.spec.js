
describe('Component: editNumber', function () {
  var scope, $q, number, defaultText, updateCallback, component;

  beforeEach(function () {
    module('app/common/components/edit-number/edit-number.template.html');
    module('echo.components.editNumber');
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;
    number = 123;
    defaultText = 'Test';
    updateCallback = jasmine.createSpy('updateCallback');
    scope.$digest();

    component = $componentController('editNumber', null, {
      number: number,
      defaultText: defaultText,
      updateCallback: updateCallback
    });
  }));

  describe('Function: editNumberHandler', function () {
    it('should show edit number form', function () {
      component.editNumberHandler();
      expect(component.showForm).toBeTruthy();
    });
  });

  describe('Function: cancelButtonHandler', function () {
    it('should hide edit number form', function () {
      component.cancelButtonHandler();
      expect(component.showForm).toBeFalsy();
    });
  });

  describe('Function: saveButtonHandler', function () {
    it('should call update callback', function () {
      var updateNumber = 1234;
      updateCallback.and.returnValue($q.when());
      component.updateNumber = updateNumber;
      component.saveButtonHandler();

      expect(updateCallback).toHaveBeenCalledWith({
        updatedNumber: updateNumber
      });
    });

    it('should hide edit number form', function (done) {
      var updateNumber = 1234;
      var updateDefer = $q.defer();
      updateCallback.and.returnValue(updateDefer.promise);
      updateDefer.resolve();
      component.updateNumber = updateNumber;
      component.saveButtonHandler();
      scope.$digest();

      updateDefer.promise.then(function () {
        expect(component.showForm).toBeFalsy();
        done();
      });

      scope.$digest();
    });
  });
});