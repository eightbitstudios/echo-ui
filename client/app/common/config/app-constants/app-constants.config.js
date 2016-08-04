angular.module('echo.config.appConstants', [])
  .constant('appConstants', {
    MIN_SEARCH_CHARACTERS: {
      CARRIERS: 3,
    },
    PAGINATION: {
      defaultPage: 1
    },
    LANGUAGES: {
      default: 'English',
      other: 'Other'
    },
    REGEX: {
      passwordLength: /^.{8,25}$/,
      passwordLowerCase: /[a-z]/,
      passwordNumber: /[0-9]/,
      passwordUpperCase: /[^a-z0-9]/
    },
    ERROR_MESSAGES: {
      400115: 'Email address already exists',
      // TODO: Change properties below to proper error codes
      passwordsDoNotMatch: 'Passwords do not match',
      enterYourPassword: 'Enter your password',
      enterYourEmailAddress: 'Enter your email address',
      invalidUsernameOrPassword: 'Invalid Username or Password.',
      invalidEmailAddress: 'Invalid Email Address.',
      invalidPassword: 'Invalid password',
      userDeactivated: 'User account is Deactivated.',
      currentPasswordRequred: 'Current password is required',
    }
  });