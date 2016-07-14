angular.module('echo.config.appConstants', [])
  .constant('appConstants', {
    MIN_SEARCH_CHARACTERS: {
      CARRIERS: 3,
    },
    REGEX: {
      PHONE: '^\\(\\d{3}\\)\\s?\\d{3}-\\d{4}$'
    }
  });