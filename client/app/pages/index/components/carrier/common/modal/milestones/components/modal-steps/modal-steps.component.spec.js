
describe('Component: modalSteps', function () {
  var component, $q, scope, steps, availableSteps, currentStep;

  beforeEach(function () {
    module('modal-steps.component.html');
    module('echo.components.modal.milestones.modalSteps');
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();

    availableSteps = {
      stepOne: 1,
      stepTwo: 2,
      stepThree: 3
    };

    steps = [availableSteps.stepOne, availableSteps.stepTwo, availableSteps.stepThree];

    currentStep = availableSteps.stepTwo;

    component = $componentController('modalSteps', null, { 
      steps: steps,
      currentStep: currentStep
    });
    component.$onInit();
  }));

  describe('$onInit', function() {
    it('init', function() {
      expect(component.maxStep).toBe(availableSteps.stepThree);
    });
  });

  describe('nextStep', function() {
    it('should go to step three', function() {
      component.nextStep();
      expect(component.currentStep).toBe(availableSteps.stepThree);
    });
    
    it('should not go past step three', function() {
      component.currentStep = availableSteps.stepThree;
      component.nextStep();
      expect(component.currentStep).toBe(availableSteps.stepThree);
    });
  });

  describe('previousStep', function() {
    it('should go to step three', function() {
      component.previousStep();
      expect(component.currentStep).toBe(availableSteps.stepOne);
    });
    
    it('should not go past step one', function() {
      component.currentStep = availableSteps.stepOne;
      component.previousStep();
      expect(component.currentStep).toBe(availableSteps.stepOne);
    });
  });
});