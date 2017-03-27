'use strict';
describe('Directive: fixedInContainer', function() {
  var element, scope, $document, $compile;

  beforeEach(function() {
    module('echo.directives.fixedInContainer', function($provide) {
      $provide.value('$document', $document = jasmine.createSpyObj('$document', ['on', 'off']));
    });
    inject(function(_$compile_, $rootScope) {
      element = angular.element('<div><div fixed-in-container=""></div></div>');
      scope = $rootScope.$new();
      $document[0] = {
        body: {}
      };
      $compile = _$compile_;
    });
  });

  it('should render the element', function() {
    $compile(element)(scope);
    scope.$digest();
    expect(element.hasClass('ng-scope')).toEqual(true);
  });

  describe('document scroll', function() {
    beforeEach(function() {
      element = angular.element('<div><div fixed-in-container="true"></div></div>');
      $compile(element)(scope);
      scope.$digest();
    });

    it('should bind to document scroll', function() {
      expect($document.on).toHaveBeenCalled();
    });

    it('should call calculateLoadingPosition', function() {
      $document.on.calls.argsFor(0)[1]();
      expect($document.on).toHaveBeenCalled();
    });
  });

  describe('document scroll', function() {
    beforeEach(function() {
      $document[0].body.scrollTop = -100;
      element = angular.element('<div><div fixed-in-container="true"></div></div>');
      $compile(element)(scope);
      scope.$digest();
    });

    it('should not move with scrollbar after the limit is reached', function() {
      expect($document.on).toHaveBeenCalled();
    });
  });
});