describe('Component: loadDetail', function() {
  var component, $scope, actionConstants, loadTypeConstants, loadDetail, refreshLoad;

  beforeEach(function() {
    module('echo.index.carrier.loadManagement.loadDetails.loadDetail', function($provide) {
      $provide.value('load-detail.component.html', '');
    });

    inject(function($rootScope, $componentController, _loadTypeConstants_, _actionConstants_) {
      $scope = $rootScope.$new();
      loadTypeConstants = _loadTypeConstants_;
      actionConstants = _actionConstants_;

      loadDetail = {
        pickUp: [],
        delivery: []
      };
      refreshLoad = jasmine.createSpy('refreshLoad');

      $scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      component = $componentController('loadDetail', null, {
        loadDetail: loadDetail,
        refreshLoad: refreshLoad
      });
    });
  });

  describe('Function: $onInit', function() {
    it('should be a multistop load if there are more than 1 pickup stops', function() {
      loadDetail.pickUp.push(1);
      loadDetail.pickUp.push(2);

      component.$onInit();
      expect(component.isMultiStop).toBeTruthy();
    });

    it('should be a multistop load if there are more than 1 delivery stops', function() {
      loadDetail.delivery.push(1);
      loadDetail.delivery.push(2);

      component.$onInit();
      expect(component.isMultiStop).toBeTruthy();
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

  describe('Function: reloadState', function() {
    it('should refresh load', function() {
      component.reloadState();
      expect(component.refreshLoad).toHaveBeenCalled();
    });
  });
});