describe('Component: shippingDetails', function() {
  var component, scope, component, $componentController;

  beforeEach(function() {
    module('shipping-details.component.html');
    module('echo.components.shippingDetails');
  });

  beforeEach(inject(function($rootScope, $compile, _$componentController_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };
    $componentController = _$componentController_
  }));

  describe('Function: $onInit', function() {
    it('should find current shippment if there is only 1 stop', function() {
      var shippingDetails = {
        id: 3,
        isCurrent: false
      };

      component = $componentController('shippingDetails', null, {
        shippingDetails: shippingDetails
      });

      component.$onInit();

      expect(component.location).toEqual(shippingDetails);
    });
    it('should find current shippment', function() {
      var shippingDetails = [{
        id: 1,
        isCurrent: false
      }, {
        id: 2,
        isCurrent: true
      }, {
        id: 3,
        isCurrent: false
      }];

      component = $componentController('shippingDetails', null, {
        shippingDetails: shippingDetails
      });

      component.$onInit();

      expect(component.location).toEqual(shippingDetails[1]);
    });

    it('should grab latest one if no current shipments', function() {
      var shippingDetails = [{
        id: 1,
        isCurrent: false
      }, {
        id: 2,
        isCurrent: false
      }, {
        id: 3,
        isCurrent: false
      }];

      component = $componentController('shippingDetails', null, {
        shippingDetails: shippingDetails
      });

      component.$onInit();

      expect(component.location).toEqual(shippingDetails[2]);
    });
  });

  describe('Function: pageClickHandler', function() {
    it('should show new location', function() {
      var shippingDetails = [{
        id: 1,
        isCurrent: true
      }, {
        id: 2,
        isCurrent: false
      }, {
        id: 3,
        isCurrent: false
      }];

      component = $componentController('shippingDetails', null, {
        shippingDetails: shippingDetails
      });

      component.$onInit();
      component.paging.selectedPage = 2;
      component.pageClickHandler();

      expect(component.location).toEqual(shippingDetails[1]);
    });
  });
});