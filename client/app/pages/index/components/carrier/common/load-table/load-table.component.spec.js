describe('Component: loadTable', function() {
  var component, $scope, actionConstants;

  beforeEach(function() {
    module('echo.components.loadTable', function($provide) {
      $provide.value('load-table.component.html', '');
    });

    inject(function($rootScope, $componentController, _actionConstants_) {
      $scope = $rootScope.$new();
      actionConstants = _actionConstants_;

      $scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      component = $componentController('loadTable', null, {});
    });
  });

  describe('Function: determineInactive', function() {
    it('should be a multistop load if there are more than 1 pickup stops', function() {
      expect(component.determineInactive()).toBeFalsy();
    });

    it('should be inactive', function() {
      expect(component.determineInactive(actionConstants.AVAILABLE_ACTIONS.REPORT_LOADED.value, false)).toBeTruthy();
      expect(component.determineInactive(actionConstants.AVAILABLE_ACTIONS.ADD_DOCUMENTS.value, false)).toBeTruthy();
      expect(component.determineInactive(actionConstants.AVAILABLE_ACTIONS.ADD_DOCUMENTS.value, true)).toBeTruthy();
      expect(component.determineInactive(actionConstants.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value, true)).toBeTruthy();
    });

    it('should be active', function() {
      expect(component.determineInactive(actionConstants.AVAILABLE_ACTIONS.REPORT_LOADED.value, true)).toBeFalsy();
      expect(component.determineInactive(actionConstants.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value, false)).toBeFalsy();
    });
  });

  describe('Function: isCancelledLoad', function() {
    var load;
    beforeEach(function() {
      load = {
        nextAction: {
          lastAction: 19
        }
      };
    });

    it('should be a cancelled load if nextAction.lastAction == 19', function() {
      expect(component.isCancelledLoad(load)).toBeTruthy();
    });

    it('should not be a cancelled load if nextAction.lastAction != 119', function() {
      load.nextAction.lastAction = 15;
      expect(component.isCancelledLoad(load)).toBeFalsy();
    });

    it('should not be a cancelled load if nextAction.lastAction is unknown', function() {
      delete load.nextAction.lastAction;
      expect(component.isCancelledLoad(load)).toBeFalsy();
    });

    it('should not be a cancelled load if nextAction is unknown', function() {
      delete load.nextAction;
      expect(component.isCancelledLoad(load)).toBeFalsy();
    });
  });

  describe('Function: isMultiStopLoad', function() {
    it('should be a multistop load if there are more than 1 pickup stops', function() {
      var load = {
        pickUp: [1, 2, 3]
      };

      expect(component.isMultiStopLoad(load)).toBeTruthy();
    });

    it('should be a multistop load if there are more than 1 delivery stops', function() {
      var load = {
        delivery: [1, 2, 3]
      };

      expect(component.isMultiStopLoad(load)).toBeTruthy();
    });

    it('should not be a multistop load if the load has less than 2 stops', function() {
      var load = {};

      expect(component.isMultiStopLoad(load)).toBeFalsy();
    });
  });
});