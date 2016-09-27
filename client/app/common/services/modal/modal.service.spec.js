describe('Service: modal', function () {
  'use strict';

  var $scope,
    $uibModal,
    $uibModalStack,
    modalService;

  beforeEach(function () {
    module('echo.services.modal', function ($provide) {
      $provide.value('$uibModal', $uibModal = {
        open: function (modalOptions) {
          return modalOptions;
        }
      });
      $provide.value('$uibModalStack', $uibModalStack = jasmine.createSpyObj('$uibModalStack', ['dismissAll']));
    });

    inject(function ($rootScope, _modalService_) {
      $scope = $rootScope.$new();
      modalService = _modalService_;
    });
  });

  describe('Function: open', function () {
    var customModalOptions,
      customConfig,
      customOptions;

    beforeEach(function () {
      customModalOptions = {};
      customConfig = {};
      customOptions = {};
    });

    it('should create html template', function () {
      customModalOptions = {
        component: 'text-component',
        bindings: {
          'testBinding': 1
        }
      };
      var modalOptions = modalService.open(customModalOptions, customConfig, customOptions);
      expect(modalOptions.template).toEqual('<text-component modal-actions="$ctrl.modalActions" test-binding="$ctrl.testBinding"><text-component/>');
    });

    it('should create controllerAs', function () {
      var modalOptions = modalService.open(customModalOptions, customConfig);
      expect(modalOptions.controllerAs).toEqual('$ctrl');
    });

    describe('modal controller', function () {
      var modalOptions,
        uibModalInstance,
        controller;

      beforeEach(function () {
        modalOptions = modalService.open(customModalOptions, customConfig);
        uibModalInstance = jasmine.createSpyObj('uibModalInstance', ['dismiss', 'close']);
        controller = new modalOptions.controller({}, uibModalInstance);
      });

      it('should create modal actions', function () {
        expect(controller.modalActions).toBeDefined();
      });
            
      it('should dismiss modal when modalAction dismiss is called', function () {
        var reason = true;
        controller.modalActions.dismiss(reason);

        expect(uibModalInstance.dismiss).toHaveBeenCalledWith(reason);
      });
              
      it('should close modal when modalAction close is called', function () {
        var reason = true;
        controller.modalActions.close(reason);

        expect(uibModalInstance.close).toHaveBeenCalledWith(reason);
      });
    });
  });

  describe('Function: dismissAll', function () {
    it('should dismiss all open modals', function() {
      modalService.dismissAll();
      expect($uibModalStack.dismissAll).toHaveBeenCalled();
    });
  });
});
