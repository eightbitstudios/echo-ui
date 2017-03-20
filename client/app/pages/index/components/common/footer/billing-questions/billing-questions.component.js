'use strict';

angular.module('echo.components.billingQuestions', [
  'echo.filters.phoneNumber'
])
.component('billingQuestions', {
  bindings: {
    phoneNumber: '='
  },
  templateUrl: 'billing-questions.component.html'
});