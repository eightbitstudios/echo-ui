
describe('Component: confirmEmpty', function () {
  var component, $q, checkboxItems, reportEmpty, scope;

  beforeEach(function () {
    module('confirm-empty.component.html');
    module('echo.components.modal.milestones.reportEmpty.confirmEmpty');
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();
    reportEmpty = {};
    checkboxItems = {
      equipmentCheckbox: {},
      serviceCheckbox: {},
      instructionCheckbox: {}
    };
    component = $componentController('confirmEmpty', null, {checkboxItems: checkboxItems, reportEmpty: reportEmpty});
  }));

  describe('Function: $onInit', function () {    

    describe('sevices', function() {
      it('should checked if empty', function() {
          component.$onInit();
          expect(component.checkboxItems.serviceCheckbox.isChecked).toBeTruthy();
      });

      it('should not be checked if services exists', function() {
        reportEmpty.equipment = [{
          displayName: 'test',
          isSpecialService: true
        }];
        component.$onInit();

        expect(component.checkboxItems.serviceCheckbox.isChecked).toBeFalsy();
      });
    });

    describe('equipment', function() {
      it('should checked if empty', function() {
          component.$onInit();
          expect(component.checkboxItems.equipmentCheckbox.isChecked).toBeTruthy();
      });

      it('should not be checked if equipment exists', function() {
        reportEmpty.equipment = [{
          displayName: 'test',
          isSpecialService: false
        }];
        component.$onInit();

        expect(component.checkboxItems.equipmentCheckbox.isChecked).toBeFalsy();
      });
    });

    describe('general instruction', function() {
      it('should checked if empty', function() {
          component.$onInit();
          expect(component.checkboxItems.equipmentCheckbox.isChecked).toBeTruthy();
      });

      it('should not be checked if equipment exists', function() {
        reportEmpty.generalInstructions = 'test';
        component.$onInit();

        expect(component.checkboxItems.instructionCheckbox.isChecked).toBeFalsy();
      });
    });
  });
});