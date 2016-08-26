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

    that.truncatedText = _.truncate(that.text, {
      length: appConstants.TEXT_TRUNCATE.readMore,
      separator: ' '
    });

    that.showReadMore = _.size(that.text) > appConstants.TEXT_TRUNCATE.readMore;

    that.clickHandler = function () {
      that.isOpen = !that.isOpen;
      if (that.isOpen) {
        that.truncatedText = that.text;
      } else {
        that.truncatedText = _.truncate(that.text, {
          length: appConstants.TEXT_TRUNCATE.readMore,
          separator: ' '
        });
      }
    };

    that.isOpen = false;
  }
});