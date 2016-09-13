angular.module('echo.models.location', [])
  .factory('LocationModel', function () {

    /**
     * @constructor
     */
    function Location(data) {
      var that = this;
      var defaults = {
        cityName: '',
        stateCode: ''
      };
      
      _.assign(that, defaults, data);
    }

    Location.prototype.setLocation = function (cityState) {
      var cityStateArray = _.split(cityState, ',');
      this.cityName = _.nth(cityStateArray, 0);
      this.stateCode = _.nth(cityStateArray, 1);
    };

    Location.prototype.getLocationString = function () {
      var cityState = '';

      if (!_.isEmpty(this.cityName) && !_.isEmpty(this.stateCode)) {
        cityState = _.join([this.cityName, this.stateCode], ', ');
      }
      return cityState;
    };

    Location.prototype.isValid = function () {

      return !_.isEmpty(this.cityName) && !_.isEmpty(this.stateCode);
    };

    /**
     * Return the constructor function
     */
    return Location;
  });
