
describe('Component: shippingDetails', function () {
  var component, scope, component, $componentController;

  beforeEach(function () {
    module('app/common/components/shipping-details/shipping-details.template.html');
    module('echo.components.shippingDetails');
  });

  beforeEach(inject(function ($rootScope, $compile, _$componentController_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };
    $componentController = _$componentController_
  }));

  it('should find current shippment', function () {
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

    expect(component.location).toEqual(shippingDetails[1]);
  });

  it('should set location if shipping details is not an array', function () {
    var shippingDetails = {
        id: 1
      };

    component = $componentController('shippingDetails', null, {
      shippingDetails: shippingDetails
    });

    expect(component.location).toEqual(shippingDetails);
  });
});