
describe('Component: pagination', function () {
  var scope, text, appConstants, component;

  beforeEach(function () {
    module('read-more.component.html');
    module('echo.components.readMore', function($provide){
      $provide.constant('appConstants', appConstants = {
        TEXT_TRUNCATE: {
          readMore: 100
        }
      });
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    text = 'Test';

    scope.$digest();

    component = $componentController('readMore', null, {
      text: text
    });
  }));

  describe('Function: $onInit', function () {
    it('should call truncate', function () {
      spyOn(component, 'truncate');
      component.$onInit();
      expect(component.truncate).toHaveBeenCalled();
    });
  });

  describe('Function: truncate', function () {
    it('should truncate text', function () {
      var truncatedText = component.truncate(text);
      expect(truncatedText).toEqual(text);
    });
  });

  describe('Function: clickHandler', function () {
    it('should show truncated text', function () {
      component.isOpen = false;
      component.clickHandler();
      expect(component.truncatedText).toEqual(text);
    });
    
    it('should hide truncated text', function () {
      component.isOpen = true;
      spyOn(component, 'truncate');
      component.clickHandler();
      expect(component.truncate).toHaveBeenCalledWith(text);
    });
  });
});