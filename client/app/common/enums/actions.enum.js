angular.module('echo.enums.actions', [])
  .constant('actionEnums', {
    AVAILABLE_ACTIONS: {
      REPORT_EMPTY: {
        value: 1,
        description: 'Report Empty'
      },
      REPORT_ARRIVED_AT_PICKUP: {
        value: 2,
        description: 'Report Arrived At Pickup'
      },
      REPORT_LOADED: {
        value: 3,
        description: 'Report Loaded'
      },
      SEND_LOAD_UPDATE: {
        value: 4,
        description: 'Send Load Update'
      },
      REPORT_ARRIVED_AT_DELIVERY: {
        value: 5,
        description: 'Report Arrived At Delivery'
      },
      REPORT_DELIVERY: {
        value: 6,
        description: 'Report Delivery'
      }
    },
    LAST_ACTION: {
      BOOKED: {
        value: 1,
        description: 'Booked'
      },
      DRIVER_ASSIGNED: {
        value: 2,
        description: 'Driver Assigned'
      },
      REPORTED_EMPTY: {
        value: 3,
        description: 'Reported Empty'
      },
      REPORTED_ARRIVAL_AT_PICKUP: {
        value: 4,
        description: 'Reported Arrival At Pickup'
      },
      REPORTED_STILL_WAITING_TO_LOAD: {
        value: 5,
        description: 'Reported Still Waiting To Load'
      },
      REPORTED_LOADED: {
        value: 6,
        description: 'Reported Loaded'
      },
      DO_NOT_DISTURB_ON: {
        value: 7,
        description: 'Do Not Disturb On'
      },
      REPORTED_DROPPED: {
        value: 8,
        description: 'Reported Dropped'
      },
      TRAILER_PICKED_UP: {
        value: 9,
        description: 'Trailer Picked Up'
      },
      REPORTED_ARRIVAL_AT_DELIVERY: {
        value: 10,
        description: 'Reported Arrival At Delivery'
      },
      REPORTED_STILL_WAITING_TO_UNLOAD: {
        value: 11,
        description: 'Reported Still Waiting To Unload'
      },
      REPORTED_UNLOADED: {
        value: 12,
        description: 'Reported Unloaded'
      },
      DOCUMENT_ADDED: {
        value: 13,
        description: 'Document Added'
      }
    }
  });
