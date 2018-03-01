describe('Component: actionButton', function() {
  var component, $q, loadsApi, documentApi, timeZoneApi, actionConstants, arrivalTypeConstants, load, actionChangedCallback, carrierId, modalOpenDefer, modalService, scope;

  beforeEach(function() {
    module('action-button.component.html');
    module('echo.components.loadTable.action.actionButton', function($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchReportEmptyByLoadGuid', 'fetchItemsByLoadGuid', 'fetchLoadUpdateOptionsByLoadGuid', 'fetchItemsByLoadGuid']));
      $provide.value('documentApi', documentApi = jasmine.createSpyObj('documentApi', ['fetchDocuments']));
      $provide.value('timeZoneApi', timeZoneApi = jasmine.createSpyObj('timeZoneApi', ['fetchTimeZones']));
      $provide.value('modalService', modalService = jasmine.createSpyObj('modalService', ['open']));
      $provide.constant('moment', function(value) {
        return value;
      });
    });
  });

  beforeEach(inject(function($rootScope, _$q_, $compile, $componentController, _actionConstants_, _arrivalTypeConstants_) {
    scope = $rootScope.$new();
    $q = _$q_;
    actionConstants = _actionConstants_;
    arrivalTypeConstants = _arrivalTypeConstants_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };
    scope.$digest();

    load = {
      loadNumber: 1234,
      loadGuid: 41234,
      nextAction: {
        actionPerformedOn: '09/08/2016',
        actionPerformedOnDate: '09/08/2016'
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
    component = $componentController('actionButton', null, {
      load: load,
      actionChangedCallback: actionChangedCallback,
      carrierId: carrierId
    });
    component.$onInit();
  }));

  describe('Function: $doCheck', function() {
    it('should set button class to warning', function() {
      component.load.escalationLevel = 2;
      component.$doCheck();
      expect(component.actionButtonEscalationClass).toEqual('btn-warning');
    });

    it('should set button class to danger', function() {
      component.load.escalationLevel = 3;
      component.$doCheck();
      expect(component.actionButtonEscalationClass).toEqual('btn-danger');
    });

    it('should not set button class', function() {
      component.mapView = true;
      component.$doCheck();
      expect(component.actionButtonEscalationClass).toBeUndefined();
    });
  });

  describe('Function: Report Empty', function() {
    var reportEmptyDefer,
      timeZoneDefer;
    beforeEach(function() {
      reportEmptyDefer = $q.defer();
      timeZoneDefer = $q.defer();
      loadsApi.fetchReportEmptyByLoadGuid.and.returnValue(reportEmptyDefer.promise);
      timeZoneApi.fetchTimeZones.and.returnValue(timeZoneDefer.promise);
    });

    it('should call report empty api', function() {
      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_EMPTY.value);
      expect(loadsApi.fetchReportEmptyByLoadGuid).toHaveBeenCalledWith(load.loadGuid);
    });

    it('should call timezone api', function() {
      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_EMPTY.value);
      expect(timeZoneApi.fetchTimeZones).toHaveBeenCalled();
    });

    it('should open modal', function(done) {
      var reportEmpty = {
          lastAction: '10/15/2016'
        },
        timeZones = [
          'CST'
        ];

      reportEmptyDefer.resolve(reportEmpty);
      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_EMPTY.value);

      scope.$digest();
      reportEmptyDefer.promise.then(function() {
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

  describe('Function: Report Loaded', function() {
    var itemsDefer,
      timeZoneDefer;
    beforeEach(function() {
      itemsDefer = $q.defer();
      timeZoneDefer = $q.defer();
      loadsApi.fetchItemsByLoadGuid.and.returnValue(itemsDefer.promise);
      timeZoneApi.fetchTimeZones.and.returnValue(timeZoneDefer.promise);
    });

    it('should call items api', function() {
      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_LOADED.value);
      expect(loadsApi.fetchItemsByLoadGuid).toHaveBeenCalledWith(load.loadGuid);
    });

    it('should call timezone api', function() {
      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_LOADED.value);
      expect(timeZoneApi.fetchTimeZones).toHaveBeenCalled();
    });

    it('should open modal', function(done) {
      var items = [{
          id: 1
        }],
        timeZones = [
          'CST'
        ];

      itemsDefer.resolve(items);
      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_LOADED.value);

      scope.$digest();

      itemsDefer.promise.then(function() {
        expect(modalService.open).toHaveBeenCalledWith({
          component: 'report-loaded-modal',
          bindings: {
            load: load,
            items: items,
            reportLoaded: {
              actionPerformedOn: load.nextAction.actionPerformedOn,
            },
            timeZones: timeZones
          }
        });
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: Send Load Update', function() {
    var loadUpdateDefer,
      timeZoneDefer;
    beforeEach(function() {
      loadUpdateDefer = $q.defer();
      timeZoneDefer = $q.defer();
      loadsApi.fetchLoadUpdateOptionsByLoadGuid.and.returnValue(loadUpdateDefer.promise);
      timeZoneApi.fetchTimeZones.and.returnValue(timeZoneDefer.promise);
    });

    it('should call load options api', function() {
      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value);
      expect(loadsApi.fetchLoadUpdateOptionsByLoadGuid).toHaveBeenCalledWith(load.loadGuid);
    });

    it('should call timezone api', function() {
      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value);
      expect(timeZoneApi.fetchTimeZones).toHaveBeenCalled();
    });

    it('should open modal', function(done) {
      var sendLoadUpdate = {
          lastAction: '05/04/2016'
        },
        timeZones = [
          'CST'
        ];

      loadUpdateDefer.resolve(sendLoadUpdate);
      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.SEND_LOAD_UPDATE.value);

      scope.$digest();

      loadUpdateDefer.promise.then(function() {
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

  describe('Function: Report Delivery', function() {
    var loadItemsDefer,
      timeZoneDefer;
    beforeEach(function() {
      loadItemsDefer = $q.defer();
      timeZoneDefer = $q.defer();
      loadsApi.fetchItemsByLoadGuid.and.returnValue(loadItemsDefer.promise);
      timeZoneApi.fetchTimeZones.and.returnValue(timeZoneDefer.promise);
    });

    it('should call items api', function() {
      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_DELIVERY.value);
      expect(loadsApi.fetchItemsByLoadGuid).toHaveBeenCalledWith(load.loadGuid);
    });

    it('should call timezone api', function() {
      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_DELIVERY.value);
      expect(timeZoneApi.fetchTimeZones).toHaveBeenCalled();
    });

    it('should open modal', function(done) {
      var items = [{
          id: 1
        }],
        timeZones = [
          'CST'
        ];

      loadItemsDefer.resolve(items);
      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_DELIVERY.value);

      scope.$digest();

      loadItemsDefer.promise.then(function() {
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

  describe('Function: Report Arrival At Pickup', function() {
    var timeZoneDefer;
    beforeEach(function() {
      timeZoneDefer = $q.defer();
      timeZoneApi.fetchTimeZones.and.returnValue(timeZoneDefer.promise);
    });

    it('should call timezone api', function() {
      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_ARRIVAL_AT_PICKUP.value);
      expect(timeZoneApi.fetchTimeZones).toHaveBeenCalled();
    });

    it('should open modal', function(done) {
      var timeZones = [
        'CST'
      ];

      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_ARRIVAL_AT_PICKUP.value);

      scope.$digest();

      timeZoneDefer.promise.then(function() {
        expect(modalService.open).toHaveBeenCalledWith({
          component: 'report-arrival-modal',
          bindings: {
            load: load,
            carrierId: carrierId,
            reportArrival: {
              actionPerformedOn: load.nextAction.actionPerformedOn,
              address: load.pickUp[0],
              driver: load.driver
            },
            timeZones: timeZones,
            arrivalType: arrivalTypeConstants.PICKUP
          }
        });
        done();
      });

      scope.$digest();
    });

    it('should set address to pickup', function(done) {
      var timeZones = [
        'CST'
      ];
      load.pickUp = load.pickUp[0];

      timeZoneDefer.resolve(timeZones);

      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.REPORT_ARRIVAL_AT_PICKUP.value);

      scope.$digest();

      timeZoneDefer.promise.then(function() {
        expect(modalService.open).toHaveBeenCalledWith({
          component: 'report-arrival-modal',
          bindings: {
            load: load,
            carrierId: carrierId,
            reportArrival: {
              actionPerformedOn: load.nextAction.actionPerformedOn,
              address: load.pickUp,
              driver: load.driver
            },
            timeZones: timeZones,
            arrivalType: arrivalTypeConstants.PICKUP
          }
        });
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: Add Documents', function() {
    it('should open modal', function() {
      var documents = [{
        documentId: 21
      }];

      documentApi.fetchDocuments.and.returnValue($q.when(documents));

      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.ADD_DOCUMENTS.value);

      scope.$digest();
      expect(modalService.open).toHaveBeenCalledWith({
        component: 'document-upload-modal',
        bindings: {
          load: load,
          documents: documents
        }
      });
    });
  });

  describe('Function: openMilestone', function() {
    it('should return action changed object', function(done) {
      var documents = [{
          documentId: 21
        }],
        returnObj = {
          id: 1
        };

      var result = $q.when(returnObj)

      documentApi.fetchDocuments.and.returnValue($q.when(documents));
      modalService.open.and.returnValue($q.when({
        result: result
      }));

      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.ADD_DOCUMENTS.value);
      scope.$digest();
      result.then(function(resultObj) {
        expect(resultObj).toEqual(returnObj);
        done();
      });
      scope.$digest();
    });

    it('should call action changed callback', function() {
      var documents = [{
          documentId: 21
        }],
        returnValue = true;

      var result = $q.when(returnValue);

      documentApi.fetchDocuments.and.returnValue($q.when(documents));
      modalService.open.and.returnValue($q.when({
        result: result
      }));

      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.ADD_DOCUMENTS.value);

      scope.$digest();
      scope.$digest();
      expect(actionChangedCallback).toHaveBeenCalled()
    });

    it('should not call action changed callback', function(done) {
      var documents = [{
          documentId: 21
        }],
        returnValue = null;

      var result = $q.when(returnValue);

      documentApi.fetchDocuments.and.returnValue($q.when(documents));
      modalService.open.and.returnValue($q.when({
        result: result
      }));

      component.openMilestone(actionConstants.AVAILABLE_ACTIONS.ADD_DOCUMENTS.value);

      scope.$digest();
      result.then(function(resultValue) {
        expect(resultValue).toEqual(returnValue);
        done();
      });
      scope.$digest();
    });
  });
});