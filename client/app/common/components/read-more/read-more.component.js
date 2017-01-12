'use strict';

angular.module('echo.components.readMore', [
  'echo.config.appConstants'
]).component('readMore', {
  bindings: {
    text: '<'
  },
  templateUrl: 'app/common/components/read-more/read-more.template.html',
  controller: function (appConstants) {

    this.clickHandler = function () {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.truncatedText = this.text;
      } else {
        this.truncatedText = this.truncate(this.text);
      }
    };

    this.truncate = function (text) {
      return _.truncate(text, {
        length: appConstants.TEXT_TRUNCATE.readMore,
        separator: ' '
      });
    };

    this.$onInit = function () {
      this.truncatedText = this.truncate(this.text);
      this.showReadMore = _.size(this.text) > appConstants.TEXT_TRUNCATE.readMore;
      this.isOpen = false;
    };

  }
});