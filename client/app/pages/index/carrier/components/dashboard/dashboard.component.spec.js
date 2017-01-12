
describe('Component: Dashboard Loads', function () {
  var component, scope, $q, carrierId, availableData,
   loadCountService, DashboardRequestBuilder, requestBuilderObj, requestDefer;

  beforeEach(function () {
    module('echo.index.carrier.loadManagement.activeLoads', function ($provide) {
      $provide.value('loadCountService', loadCountService = jasmine.createSpyObj('loadCountService', ['getLoadCount', 'setLoadCount']));
      $provide.value('app/pages/index/carrier/components/dashboard/dashboard.template.html');
      $provide.value('DashboardRequestBuilder', 
        DashboardRequestBuilder = jasmine.createSpy('DashboardRequestBuilder'));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    carrierId = 1;
    availableData = {
      loads: {
        totalLoadCount: 24,
        loads: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          },
          {
            id: 4
          }
        ]
      },
      mapLoads: [
        {
          id: 1
        },
        {
          id: 2
        }
      ],
      loadsCount: {
        active: 12,
        unbilled: 13,
        upcoming: 4
      }
    };

    requestBuilderObj = jasmine.createSpyObj('requestBuilderObj', ['fetchMapData', 'fetchLoadsCount', 'fetchActiveLoads', 'hasMapData', 'filterByPickupsToday', 'filterByDeliveriesToday', 'execute']);
    ActiveLoadsRequestBuilder.and.returnValue(requestBuilderObj);
    requestBuilderObj.fetchActiveLoads.and.returnValue({execute: requestBuilderObj.execute});
    requestDefer = $q.defer();
    requestBuilderObj.execute.and.returnValue(requestDefer.promise);
    
    component = $componentController('activeLoads', null, {
      carrierId: carrierId
    });
  }));
});
