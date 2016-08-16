'use strict';
angular.module('echo.services.modal', [
  'ui.bootstrap.modal'
]).factory('modalService', function ($uibModal, $uibModalStack) {

  /**
   * These are the modal options that will be applied to the bootstrap modal created
   * @example http://angular-ui.github.io/bootstrap/#/modal
   * @property {string} headerText        - Header Text that will display at the header location of the modal
   */
  var modalOptions = {
    backdrop: true,
    keyboard: true,
    modalFade: true,
    template: '',
    size: ''
  };

  /**
   * These are the config properties that are required to correctly setup and initialize the modal
   * @property {string} headerText - Header Text that will display at the header location of the modal
   * @property {string} template - Html to include in the body of the modal
   */
  var config = {
    headerText: '',                 // Header
    template: undefined,            // Path to the URL to use
    controllerAs: undefined,        // Name of the controller to use
    scrollable: true               // Indicting that the modal-body is scrollable.  Defaults to true
  };

  return {

    /**
     * This will show the modal with the modalOptions, config and controller options provided
     * @param {Object} customModalOptions 
     * @property {string} customModalOptions.component - Name of the component
     * @property {Object} [customModalOptions.bindings] - Bindings for component
     * @property {boolean} [customModalOptions.backdrop] - If modal should have backdrop
     * @property {boolean} [customModalOptions.keyboard] - If modal should have keyboard support
     * @property {boolean} [customModalOptions.modalFade] - If modal should fade in and out
     * @property {string} [customModalOptions.size] - Modal size
     * @param {Object} [customConfig]        - config properties used to setup the modal, config properties:
     * @property {string} [customConfig.headerText]         - Header Text that will display at the header location of the modal
     * @property {string} [customConfig.bodyTemplateUrl]    - Url of the template html to include in the body of the modal
     * @property {string} [customConfig.bodyTemplateUrl]    - Name of the Controller to initialize with the modal
     * @property {boolean} [customConfig.scrollable]        - Boolean indicator if the modal-body should be scrollable
     *
     * @param {Object} [customOptions]       - optional parameter which will accept any variation of a single object
     *                                         to describe properties that will be injected into the controller during initialization
     */
    open: function (customModalOptions, customConfig, customOptions) {
      // Create temp objects to work with since we're in a singleton service
      var extModalOptions = {};
      var extConfig = {};
      var extOptions = {};

      // $ctrl will be referenced in the view to access the Controller and its methods
      extModalOptions.controllerAs = '$ctrl';

      // Create template based on component and bindings passed into customModalOptions
      customModalOptions.template = _.template('<${component} modal-actions="${ctrlName}.modalActions" ${bindings}><${component}/>')({
        component: customModalOptions.component,
        ctrlName: extModalOptions.controllerAs,
        bindings: _(customModalOptions.bindings).map(function (value, key) {
          return _.template('${bindingName}="${ctrlName}.${binding}"')({
            bindingName: _.kebabCase(key),
            binding: key,
            ctrlName: extModalOptions.controllerAs
          });
        })
      });

      // Modal Options
      // Map angular-ui modal custom defaults to modal defaults defined in service
      angular.extend(extModalOptions, modalOptions, customModalOptions);

      // Config
      // Map modal.html $scope custom properties to defaults defined in service
      angular.extend(extConfig, config, customConfig);

      // Options to be injected into controller
      extOptions = customOptions ? customOptions : {};

      // Setup Controller
      // Extends the controller provided to append config properties as well as the close button handler
      extModalOptions.controller = function ($controller, $uibModalInstance) {

        var that = this;
        
        var modalActions = {
          dismiss: function (reason) {
            $uibModalInstance.dismiss(reason);
          },
          close: function (value) {
            $uibModalInstance.close(value);
          }
        };

        _.assign(that, customModalOptions.bindings);

        // Append Config onto the controller object
        that.config = extConfig;
        that.modalActions = modalActions; // Exposes modalActions to template
      };

      // Inject the dependencies into our modals flashy new controller
      extModalOptions.controller.$inject = ['$controller', '$uibModalInstance'];

      // Returns the $uibModalInstance, close/dismiss/result/opened can be accessed here
      return $uibModal.open(extModalOptions);
    },

    /**
     * Dismiss all modals
     */
    dismissAll: function () {
      $uibModalStack.dismissAll();
    }

  };

});
