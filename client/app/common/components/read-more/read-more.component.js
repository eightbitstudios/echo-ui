'use strict';

angular.module('echo.components.readMore', []).component('readMore', {
  bindings: {
    text: '<'
  },
  templateUrl: 'app/common/components/read-more/read-more.template.html',
  controller: function () {
    var that = this;

    that.truncatedText = _.truncate(that.text, {
      length: 138,
      separator: ' '
    });

    that.showReadMore = _.size(that.text) > 138;

    that.clickHandler = function () {
      that.isOpen = !that.isOpen;
      if (that.isOpen) {
        that.truncatedText = that.text;
      } else {
        that.truncatedText = _.truncate(that.text, {
          length: 138,
          separator: ' '
        });
      }
    };

    that.isOpen = false;
  }
});