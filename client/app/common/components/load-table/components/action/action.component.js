angular.module('echo.components.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.enums.loadTypes',
  'echo.components.modal.milestones.reportEmpty',
  'echo.services.modal',
  'echo.api.loads'
])
  .component('action', {
    templateUrl: 'app/common/components/load-table/components/action/action.template.html',
    bindings: {
      load: '<'
    },
    controller: function (appConstants, loadTypesEnum, modalService, loadsApi) {
      var that = this;

      that.appConstants = appConstants;
      that.loadTypesEnum = loadTypesEnum;
      that.showButtonLoading = false;

      that.openMilestone = function () {
        that.showButtonLoading = true;
        loadsApi.fetchReportEmptyByLoadGuid(that.load.loadGuid).then(function (reportEmpty) {
          modalService.open({
            component: 'report-empty-modal',
            bindings: {
              load: that.load,
              reportEmpty: reportEmpty
            }
          });
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };
    }
  });
