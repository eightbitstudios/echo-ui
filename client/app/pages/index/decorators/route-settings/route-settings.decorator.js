'use strict';

angular.module('echo.index.decorators.routeSettings', [
  'echo.enums.roles'
])
  .factory('RouteSettingsDecorator', function (RolesEnum) {
    /**
     * @constructor
     */
    function RouteSettingsDecorator() {
      return this;
    }

    /**
     * Shows the default background for route.
     */
    RouteSettingsDecorator.prototype.showDefaultContainer = function () {
      this.whiteContainer = false;
      return this;
    };

    /**
     * Shows a white background for route.
     */
    RouteSettingsDecorator.prototype.showWhiteContainer = function () {
      this.whiteContainer = true;
      return this;
    };


    /**
     * Hides tab bar for route.
     */
    RouteSettingsDecorator.prototype.setTabBarHidden = function () {
      this.hideTabBar = true;
      return this;
    };

    /**
     * Restricts a route based on a users role
     */
    RouteSettingsDecorator.prototype.echoRepOnly = function () {
      this.role = RolesEnum.ECHO_REP;
      return this;
    };

    /**
     * Authentication is required for a route
     */
    RouteSettingsDecorator.prototype.authenticationRequired = function () {
      this.auth = true;
      return this;
    };

    /**
     * Saves a name for the route for history
     */
    RouteSettingsDecorator.prototype.routeName = function (name) {
      this.name = name;
      return this;
    };

    /**
     * Return the constructor function
     */
    return RouteSettingsDecorator;
  });