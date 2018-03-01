describe('Model: checkbox', function () {
  'use strict';

  var CheckboxModel;

  beforeEach(function () {
    module('echo.models.checkbox');
    inject(function (_CheckboxModel_) {
      CheckboxModel = _CheckboxModel_;
    });
  });

  it('should default isChecked to false', function () {
    var checkbox = new CheckboxModel();

    expect(checkbox.isChecked).toBeFalsy();
  });
});
