'use strict';

angular.module('echo.components.billingQuestions', [])
.component('billingQuestions', {
  bindings: {
    phoneNumber: '='
  },
  templateUrl: 'app/common/components/billing-questions/billing-questions.template.html',
  controller: function () {}
});