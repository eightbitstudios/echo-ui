angular.module('echo.config.appConstants', [])
  .constant('appConstants', {
    MIN_SEARCH_CHARACTERS: {
      CARRIERS: 3,
      loads: 3
    },
    LIMIT: {
      driverList: 5,
      loadsList: 10
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
      400: 'An error occured',
      400103: 'Invalid username',
      400105: 'First name is required',
      400106: 'Phone number is required',
      400107: 'Email Address is required',
      400110: 'Invalid password',
      400111: 'Invalid current password',
      400112: 'Passwords do not match',
      400115: 'Password and Confirm Password do not match',
      401101: 'User account is deactivated',
      401102: 'Invalid Username or Password',
      500: 'An unexpected error has occurred',
      500100: 'Unable to change current password',
      500101: 'Duplicate username',
      500103: 'Unable to create user'
    },
    STATUSES: {
      ReportedEmpty: 'Reported Empty',
      ReportedDropped: 'Reported Dropped',
      ReportedLocation: 'Reported Location',
      DriverAssigned: 'Driver Assigned',
      LoadNowActive: 'Load Now Active',
      ReportedLoaded: 'Reported Loaded',
      ReportArrivalAtPickup: 'Report Arrival At Pickup',
      ReportArrivalAtDeliver: 'Report Arrival At Deliver',
      ReportDelivery: 'Report Delivery',
      SendLoadUpdate: 'Send Load Update',
      ReportLoaded: 'Reported Loaded',
      ReportEmpty: 'Reported Empty',
      ReportLocation: 'Reported Location',
      AddDocuments: 'Add Documents',
      CallToUpdate: 'Call To Update'
    }
  });