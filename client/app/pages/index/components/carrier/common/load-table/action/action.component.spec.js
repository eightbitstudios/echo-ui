describe('Component: Action', function() {
  var component, $q, actionConstants, loadTypeConstants, scope, load, actionChangedCallback;

  beforeEach(function() {
    module('echo.components.loadTable.action', function($provide) {
      $provide.value('action.component.html', '');
    });
    inject(function($rootScope, _$q_, $compile, $componentController, _actionConstants_, _loadTypeConstants_) {
      scope = $rootScope.$new();
      $q = _$q_;
      actionConstants = _actionConstants_;
      loadTypeConstants = _loadTypeConstants_;
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

      actionChangedCallback = jasmine.createSpy('actionChangedCallback');

      component = $componentController('action', null, {
        load: load,
        actionChangedCallback: actionChangedCallback
      });
    });
  });

  describe('Function $onInit', function() {
    it('should be a booked load', function() {
      load.nextAction.lastAction = actionConstants.LAST_ACTION.BOOKED.value;
      component.$onInit();
      expect(component.isBooked).toBeTruthy();
    });

    it('should be able to add documents to load', function() {
      load.nextAction.nextAction = actionConstants.AVAILABLE_ACTIONS.ADD_DOCUMENTS.value;
      component.$onInit();
      expect(component.isAddDocuments).toBeTruthy();
    });
  });

  describe('Function documentsRequired', function() {
    beforeEach(function() {
      component.$onInit();
    });

    it('should require documents if an invoice is needed', function() {
      load.needsInvoice = true;
      expect(component.documentsRequired()).toBeTruthy();
    });

    it('should require documents if needed pod documents is greater than 0', function() {
      load.needsInvoice = false;
      load.neededPODs = 23;
      expect(component.documentsRequired()).toBeTruthy();
    });

    it('should not need any documents if needed pods and invoices are 0', function() {
      load.needsInvoice = false;
      load.neededPODs = 0;
      expect(component.documentsRequired()).toBeFalsy();
    });
  });

  describe('Function disableActionButton', function() {
    beforeEach(function() {
      component.$onInit();
    });

    it('should be disabled if load is unbilled and no documents are required', function() {
      spyOn(component, 'documentsRequired').and.returnValue(false);
      component.loadType = loadTypeConstants.UNBILLED;
      expect(component.disableActionButton()).toBeTruthy();
    });

    it('should not be disabled if documents are required', function() {
      spyOn(component, 'documentsRequired').and.returnValue(true);
      component.loadType = loadTypeConstants.UNBILLED;
      expect(component.disableActionButton()).toBeFalsy();
    });

    it('should not be disabled if load is active', function() {
      spyOn(component, 'documentsRequired').and.returnValue(false);
      component.loadType = loadTypeConstants.ACTIVE;
      expect(component.disableActionButton()).toBeFalsy();
    });
  });
});