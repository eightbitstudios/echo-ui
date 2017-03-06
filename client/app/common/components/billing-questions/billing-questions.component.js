'use strict';

angular.module('echo.components.billingQuestions', [
  'echo.filters.phoneNumber'
])
.component('billingQuestions', {
  bindings: {
    phoneNumber: '='
  },
  templateUrl: 'app/common/components/billing-questions/billing-questions.component.html'
});