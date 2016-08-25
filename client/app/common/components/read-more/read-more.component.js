'use strict';

angular.module('echo.components.readMore', [
  'echo.config.appConstants'
]).component('readMore', {
  bindings: {
    text: '<'
  },
  templateUrl: 'app/common/components/read-more/read-more.template.html',
  controller: function (appConstants) {
    var that = this;

    that.clickHandler = function () {
      that.isOpen = !that.isOpen;
      if (that.isOpen) {
        that.truncatedText = that.text;
      } else {
        that.truncatedText = that.truncate(that.text);
      }
    };

    that.truncate = function (text) {
      return _.truncate(text, {
        length: appConstants.TEXT_TRUNCATE.readMore,
        separator: ' '
      });
    };

    that.$onInit = function () {
      that.truncatedText = that.truncate(that.text);

      that.showReadMore = _.size(that.text) > appConstants.TEXT_TRUNCATE.readMore;
      that.isOpen = false;
    };

  }
});