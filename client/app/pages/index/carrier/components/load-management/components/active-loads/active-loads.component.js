angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.components.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.services.modal',
  'echo.config.appConstants',
  'echo.index.carrier.loadManagement.loadsFilter',
  'echo.enums.loadTypes',
  'echo.components.modal.documentOverview',
  'echo.components.filterButton',
  'echo.components.loadMap'
]).component('activeLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function(loadsApi, PagingModel, appConstants, loadTypesEnum, modalService) {
    var that = this;
    that.showLoading = false;
    that.paging = new PagingModel(appConstants.LIMIT.loadsList);
    that.isPickUpToday = false;
    that.loadType = loadTypesEnum.ACTIVE;
    that.isDeliveriesToday = false;
    var defaultFilterText = 'By Next Appointment';
    that.filterText = defaultFilterText;

    that.getAvailableLoads = function() {
      that.showLoading = true;
      loadsApi.fetchAvailableLoads(that.carrierId, that.paging, that.isPickUpToday, that.isDeliveriesToday).then(function(availableLoadData) {
        that.paging.totalRecords = availableLoadData.totalLoadCount;
        that.paging.recordCount = _.size(availableLoadData.loads);
        that.activeLoads = availableLoadData.loads;
      }).finally(function() {
        that.showLoading = false;
      });
    };

    that.documents = [{
      name: 'Test Document',
      user: {
        firstName: 'Echo'
      },
      url: 'assets/images/document-preview-TEMP.jpg',
      timestamp: 'Updated 06:45 CST, Today'
    }, {
      name: 'Test Document #2',
      user: {
        firstName: 'Test',
        lastName: 'Tester'
      },
      url: 'assets/images/document-preview-TEMP.jpg',
      timestamp: 'Updated 10:24 CST, Yesterday'
    }];

    that.selectedDocument = that.documents[0];

    modalService.open({
      component: 'document-overview-modal',
      windowTopClass: 'transparent',
      openedClass: 'dark modal-open',
      bindings: {
        documents: that.documents,
        selectedDocument: that.selectedDocument
      }
    });

    that.deliveriesTodayHandler = function(value) {
      if (!value) {
        that.filterText = defaultFilterText;
      } else {
        that.filterText = 'By Next Delivery';
      }

      that.isPickUpToday = false;
      that.isDeliveriesToday = value;
      that.paging.reset();
      that.getAvailableLoads();
    };

    that.pickupsTodayHandler = function(value) {
      if (!value) {
        that.filterText = defaultFilterText;
      } else {
        that.filterText = 'By Next Pickup';
      }
      that.isDeliveriesToday = false;
      that.isPickUpToday = value;
      that.paging.reset();
      that.getAvailableLoads();
    };

    that.getMapPointsForAvailableLoads = function() {
      that.showMap = false;
      that.mapPoints = [];
      loadsApi.fetchMapPointsForActiveLoads(that.carrierId).then(function(mapPointData) {
        that.mapPoints = mapPointData;
        that.showMap = true;
      });
    };

    that.refreshPageData = function() {
      that.getAvailableLoads();
      that.getMapPointsForAvailableLoads();
    };

    that.$onInit = function() {
      that.refreshPageData();
    };
  }
});