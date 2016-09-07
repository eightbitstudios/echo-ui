angular.module('echo.models.checkbox', [])
  .factory('CheckboxModel', function () {

    /**
     * @constructor
     */
    function Checkbox() {
      var that = this;
      that.isChecked = false;
    }

    /**
     * Return the constructor function
     */
    return Checkbox;
  });
