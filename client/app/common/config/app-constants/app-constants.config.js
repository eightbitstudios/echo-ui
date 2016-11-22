angular.module('echo.config.appConstants', [])
  .constant('appConstants', {
    MIN_SEARCH_CHARACTERS: {
      CARRIERS: 3,
      loads: 3
    },
    TEXT_TRUNCATE: {
      readMore: 140
    },
    LIMIT: {
      driverList: 5,
      loadsList: 10,
      loadsNeedingAction: 5,
      multistopLoads: 5
    },
    LANGUAGES: {
      default: 'English',
      other: 'Other'
    },
    REGEX: {
      passwordLength: /^.{8,}$/,
      passwordLowerCase: /[a-z]/,
      passwordNumber: /[0-9]/,
      passwordUpperCase: /[A-Z]/
    },
    ERROR_MESSAGES: {
      DEFAULTS: {
        400: 'An error occurred',
        400100: 'RepId Missing or Invalid',
        400101: 'CarrierId Missing or Invalid',
        400102: 'UserId Missing or Invalid',
        400103: 'Invalid username',
        400104: 'Carrier not found for CarrierId provided',
        400105: 'First name is required',
        400106: 'Phone number is required',
        400107: 'Email Address is required',
        400108: 'User not found for UserId provided',
        400109: 'InvitationToken Missing or Invalid',
        400110: 'Invalid password',
        400111: 'Invalid current password',
        400112: 'Passwords do not match',
        400113: 'DriverId Missing or Invalid',
        400114: 'SearchTerm Missing or Invalid',
        400115: 'Password and Confirm Password do not match',
        400116: 'Too many filters selected',
        400117: 'OneLoginRoleId Missing or Invalid',
        400118: 'LoadId Missing or Invalid',
        400119: 'Driver not found for UserId provided',
        400120: 'Load not found for LoadId provided',
        400121: 'Duplicate Error Codes',
        400122: 'AssignedLoad Not Found for LoadGuid Provided',
        400123: 'LoadGuid Missing or Invalid',
        400124: 'DateTime Missing or Invalid',
        400125: 'TimeZone Missing or Invalid',
        400126: 'Location Missing or Invalid',
        400127: 'StopType Missing or Invalid',
        400128: 'Phone Number already in use',
        400129: 'Submitted time is invalid',
        401: 'Unauthorized',
        401100: 'Invalid Authorization Header',
        401101: 'User account is deactivated',
        401102: 'Invalid Username or Password',
        401103: 'Unknown User Role',
        401104: 'Account is Locked',
        401106: 'Refresh Token is Invalid',
        401105: 'User Role Not Allowed To Reset Password in Portal',
        404: 'Not found',
        404100: 'Load not found',
        404101: 'Driver not found',
        404102: 'Username does not exist',
        404103: 'Carrier Not Found',
        404104: 'Load Shipment Details Not Found',
        404105: 'City/State combination not found',
        500: 'An unexpected error has occurred',
        500100: 'Unable to change current password',
        500101: 'Username already in use',
        500102: 'Unable to Update OneLogin User',
        500103: 'Unable to create user',
        500104: 'Unable to Read OneLogin User',
        500105: 'Unable to Assign OneLogin User to Role',
        500106: 'Email already in use',
        500107: 'Unable to Delete OneLogin User',
        500108: 'Unable to Assign Driver to Load',
        500109: 'Unable to Unassign Driver from Load',
        500110: 'Unable to Unassign Driver from Load',
        500111: 'Error writing into shipment activity service',
        500117: 'Invalid date for the action.'
      },
      DRIVER: {
        500101: 'Phone number already in use',
      },
      PORTAL_USER: {
        500101: 'Email address already in use',
      }

    },
    CUSTOM_ERROR_CODES: [500112, 500113],
    DEFAULT_MAP_ZOOM: {
      ONE_POINT: 15,
      OTHER: 4
    },
    DEFAULT_MAP_CENTER: {
      lat: 39.50,
      lng: -98.35
    },
    PRIVACY_POLICY_URL: 'https://www.echo.com/privacypolicy.html'
  });
