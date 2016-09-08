angular.module('echo.models.location', [])
  .factory('LocationModel', function () {

    /**
     * @constructor
     */
    function Location(data) {
      var that = this;
      var defaults = {
        city: '',
        state: ''
      };
      
      _.assign(that, defaults, data);
    }

    Location.prototype.setLocation = function (cityState) {
      var cityStateArray = _.split(cityState, ',');
      this.city = _.nth(cityStateArray, 0);
      this.state = _.nth(cityStateArray, 1);
    };

    Location.prototype.getLocationString = function () {
      var cityState = '';

      if (!_.isEmpty(this.city) && !_.isEmpty(this.state)) {
        cityState = _.join([this.city, this.state], ', ');
      }
      return cityState;
    };

    Location.prototype.isValid = function () {

      return !_.isEmpty(this.city) && !_.isEmpty(this.state);
    };

    /**
     * Return the constructor function
     */
    return Location;
  });
