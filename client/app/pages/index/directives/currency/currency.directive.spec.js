'use strict';
describe('Directive: currency', function() {
  var element, scope;

  beforeEach(function() {

    module('echo.directives.currency');
    inject(function($compile, $rootScope) {
      element = angular.element('<input type="text" currency />');
      scope = $rootScope.$new();

      $compile(element)(scope);
      scope.$digest();
    });
  });

  it('should render the element', function() {
    expect(element.hasClass('ng-scope')).toEqual(true);
  });

  describe('Function: blur', function() {
    it('should not change text inputs value', function() {
      element.triggerHandler('blur');
      expect(element.val()).toEqual('');
    });

    it('should remove non-numeric values', function() {
      element.val('asbasd');
      element.triggerHandler('blur');
      expect(element.val()).toEqual('');
    });

    it('should format numeric value', function() {
      element.val('130');
      element.triggerHandler('blur');
      expect(element.val()).toEqual('$130');
    });

    it('should add comma for values greater than 999', function() {
      element.val('13000');
      element.triggerHandler('blur');
      expect(element.val()).toEqual('$13,000');
    });

    it('should remove non-numeric values and return formatted value', function() {
      element.val('130av00dsf')
      element.triggerHandler('blur');
      expect(element.val()).toEqual('$13,000');
    });
  });

  describe('Function: focus', function() {
    it('should not change text inputs value', function() {
      element.triggerHandler('focus');
      expect(element.val()).toEqual('');
    });

    it('should remove commas', function() {
      element.val('13,000');
      element.triggerHandler('focus');
      expect(element.val()).toEqual('13000');
    });

    it('should remove dollar sign', function() {
      element.val('$130');
      element.triggerHandler('focus');
      expect(element.val()).toEqual('130');
    });

    it('should remove comma and dollar sign', function() {
      element.val('$13,000');
      element.triggerHandler('focus');
      expect(element.val()).toEqual('13000');
    });
  });

});