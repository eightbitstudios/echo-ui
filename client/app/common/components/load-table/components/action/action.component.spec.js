
describe('Component: action', function () {
  var component, $q, loadsApi, timeZoneApi, actionEnums, arrivalTypeEnums, load, actionChangedCallback, carrierId, modalOpenDefer, modalService, scope;

  beforeEach(function () {
    module('app/common/components/load-table/components/action/action.template.html');
    module('echo.components.loadTable.action', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchReportEmptyByLoadGuid', 'fetchItemsByLoadGuid', 'fetchLoadUpdateOptionsByLoadGuid', 'fetchItemsByLoadGuid']));
      $provide.value('timeZoneApi', timeZoneApi = jasmine.createSpyObj('timeZoneApi', ['fetchTimeZones']));
      $provide.value('modalService', modalService = jasmine.createSpyObj('modalService', ['open']));
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController, _actionEnums_, _arrivalTypeEnums_) {
    scope = $rootScope.$new();
    $q = _$q_;
    actionEnums = _actionEnums_;
    arrivalTypeEnums = _arrivalTypeEnums_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };
    scope.$digest();

    load = {
      loadNumber: 1234,
      loadGuid: 41234,
      nextAction: {
        actionPerformed: '09/08/2016'
      },
      pickUp: [{
        city: 'Chicago'
      }]
    };

    modalOpenDefer = $q.defer();
    actionChangedCallback = jasmine.createSpy('actionChangedCallback');
    modalService.open.and.returnValue({
      result: modalOpenDefer.promise
    });
    carrierId = 1;
    component = $componentController('action', null, {
      load: load,
      actionChangedCallback: actionChangedCallback,
      carrierId: carrierId
    });
  }));

  describe('Function: $onInit', function () {
    it('should set button class to warning', function () {
      component.load.escalationLevel = 2;
      component.$onInit();
      expect(component.actionButtonEscalationClass).toEqual('btn-warning');
    });

    it('should set button class to danger', function () {
      component.load.escalationLevel = 3;
      component.$onInit();
      expect(component.actionButtonEscalationClass).toEqual('btn-danger');

    });
  });
  
  describe('Function: Report Empty', function () {
    var reportEmptyDefer,
      timeZoneDefer;
    beforeEach(function () {
      reportEmptyDefer = $q.defer();
      timeZoneDefer = $q.defer();
      loadsApi.fetchReportEmptyByLoadGuid.and.returnValue(reportEmptyDefer.promise);
      timeZoneApi.fetchTimeZones.and.returnValue(timeZoneDefer.promise);
    });

    it('should call report empty api', function () {
      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_EMPTY.value);
      expect(loadsApi.fetchReportEmptyByLoadGuid).toHaveBeenCalledWith(load.loadGuid);
    });

    it('should call timezone api', function () {
      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_EMPTY.value);
      expect(timeZoneApi.fetchTimeZones).toHaveBeenCalled();
    });

    it('should open modal', function (done) {
      var reportEmpty = {
        lastAction: '10/15/2016'
      }, timeZones = [
        'CST'
      ];

      reportEmptyDefer.resolve(reportEmpty);
      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_EMPTY.value);

      scope.$digest();

      reportEmptyDefer.promise.then(function () {
        expect(modalService.open).toHaveBeenCalledWith({
          component: 'report-empty-modal',
          bindings: {
            load: load,
            reportEmpty: reportEmpty,
            timeZones: timeZones
          }
        });
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: Report Loaded', function () {
    var itemsDefer,
      timeZoneDefer;
    beforeEach(function () {
      itemsDefer = $q.defer();
      timeZoneDefer = $q.defer();
      loadsApi.fetchItemsByLoadGuid.and.returnValue(itemsDefer.promise);
      timeZoneApi.fetchTimeZones.and.returnValue(timeZoneDefer.promise);
    });

    it('should call items api', function () {
      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_LOADED.value);
      expect(loadsApi.fetchItemsByLoadGuid).toHaveBeenCalledWith(load.loadGuid);
    });

    it('should call timezone api', function () {
      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_LOADED.value);
      expect(timeZoneApi.fetchTimeZones).toHaveBeenCalled();
    });

    it('should open modal', function (done) {
      var items = [{
        id: 1
      }], timeZones = [
        'CST'
      ];

      itemsDefer.resolve(items);
      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_LOADED.value);

      scope.$digest();

      itemsDefer.promise.then(function () {
        expect(modalService.open).toHaveBeenCalledWith({
          component: 'report-loaded-modal',
          bindings: {
            load: load,
            items: items,
            reportLoaded: {
              lastActionDate: load.nextAction.actionPerformed,
            },
            timeZones: timeZones
          }
        });
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: Send Load Update', function () {
    var loadUpdateDefer,
      timeZoneDefer;
    beforeEach(function () {
      loadUpdateDefer = $q.defer();
      timeZoneDefer = $q.defer();
      loadsApi.fetchLoadUpdateOptionsByLoadGuid.and.returnValue(loadUpdateDefer.promise);
      timeZoneApi.fetchTimeZones.and.returnValue(timeZoneDefer.promise);
    });

    it('should call load options api', function () {
      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value);
      expect(loadsApi.fetchLoadUpdateOptionsByLoadGuid).toHaveBeenCalledWith(load.loadGuid);
    });

    it('should call timezone api', function () {
      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value);
      expect(timeZoneApi.fetchTimeZones).toHaveBeenCalled();
    });

    it('should open modal', function (done) {
      var sendLoadUpdate = {
        lastAction: '05/04/2016'
      }, timeZones = [
        'CST'
      ];

      loadUpdateDefer.resolve(sendLoadUpdate);
      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value);

      scope.$digest();

      loadUpdateDefer.promise.then(function () {
        expect(modalService.open).toHaveBeenCalledWith({
          component: 'send-load-update-modal',
          bindings: {
            load: load,
            sendLoadUpdate: sendLoadUpdate,
            timeZones: timeZones,
            carrierId: carrierId
          }
        });
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: Report Delivery', function () {
    var loadItemsDefer,
      timeZoneDefer;
    beforeEach(function () {
      loadItemsDefer = $q.defer();
      timeZoneDefer = $q.defer();
      loadsApi.fetchItemsByLoadGuid.and.returnValue(loadItemsDefer.promise);
      timeZoneApi.fetchTimeZones.and.returnValue(timeZoneDefer.promise);
    });

    it('should call items api', function () {
      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_DELIVERY.value);
      expect(loadsApi.fetchItemsByLoadGuid).toHaveBeenCalledWith(load.loadGuid);
    });

    it('should call timezone api', function () {
      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_DELIVERY.value);
      expect(timeZoneApi.fetchTimeZones).toHaveBeenCalled();
    });

    it('should open modal', function (done) {
      var items = [{
        id: 1
      }], timeZones = [
        'CST'
      ];

      loadItemsDefer.resolve(items);
      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_DELIVERY.value);

      scope.$digest();

      loadItemsDefer.promise.then(function () {
        expect(modalService.open).toHaveBeenCalledWith({
          component: 'report-delivery-modal',
          bindings: {
            load: load,
            timeZones: timeZones,
            items: items
          }
        });
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: Report Arrival At Pickup', function () {
    var timeZoneDefer;
    beforeEach(function () {
      timeZoneDefer = $q.defer();
      timeZoneApi.fetchTimeZones.and.returnValue(timeZoneDefer.promise);
    });

    it('should call timezone api', function () {
      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_ARRIVAL_AT_PICKUP.value);
      expect(timeZoneApi.fetchTimeZones).toHaveBeenCalled();
    });

    it('should open modal', function (done) {
      var timeZones = [
        'CST'
      ];

      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionEnums.AVAILABLE_ACTIONS.REPORT_ARRIVAL_AT_PICKUP.value);

      scope.$digest();

      timeZoneDefer.promise.then(function () {
        expect(modalService.open).toHaveBeenCalledWith({
          component: 'report-arrival-modal',
          bindings: {
            load: load,
            carrierId: carrierId,
            reportArrival: {
              lastActionDate: load.nextAction.actionPerformed,
              address: load.pickUp[0],
              driver: load.driver
            },
            timeZones: timeZones,
            arrivalType: arrivalTypeEnums.PICKUP
          }
        });
        done();
      });

      scope.$digest();
    });
  });
});