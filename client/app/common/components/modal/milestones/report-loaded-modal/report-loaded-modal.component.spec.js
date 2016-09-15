
describe('Component: reportLoadedModal', function () {
  var component, $q, modalServiceOpenDefer, modalActions, items, loadsApi, modalService, DateTimePickerModel, scope, element, state;

  beforeEach(function () {
    module('app/common/components/modal/milestones/report-loaded-modal/report-loaded-modal.template.html');
    module('echo.components.modal.milestones.reportLoaded', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['createReportLoaded']));
      $provide.value('modalService', modalService = jasmine.createSpyObj('modalService', ['open']));
      $provide.value('CheckboxModel', jasmine.createSpy('CheckboxModel'));
      $provide.value('DateTimePickerModel', DateTimePickerModel = function(data){
        _.assign(this, data);
        this.getDateTime = _.noop;
      });
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    modalServiceOpenDefer = $q.defer();

    modalService.open.and.returnValue({
      result: modalServiceOpenDefer.promise
    });

    modalActions = jasmine.createSpyObj('modalActions', ['close']);
    items = [];
    scope.$digest();

    component = $componentController('reportLoadedModal', null, { modalActions: modalActions, load: {
      nextAction: {},
      items: items
    }, timeZones: {}, sendLoadUpdate: {}, reportLoaded: {}, carrierId: 1 });
  }));

  describe('Function: init', function () {
   it('should calculate total weight', function() {
     component.items = [{
       estimatedWeight: 2
     },{
       estimatedWeight: 4
     }];

     component.$onInit();

     expect(component.totalWeight).toBe(6);
   });
  });

  describe('Function: isNextStepEnabled', function () {
   it('should enable next button if all items are checked', function() {
     component.checkboxItems = [{
       isChecked: true
     },{
       isChecked: true
     }];

     expect(component.isNextStepEnabled()).toBeTruthy();
   });
  
  it('should disable next button if all items are not checked', function() {
     component.checkboxItems = [{
       isChecked: true
     },{
       isChecked: false
     }];

     expect(component.isNextStepEnabled()).toBeFalsy();
   });
  });
});