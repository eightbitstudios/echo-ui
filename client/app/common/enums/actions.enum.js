angular.module('echo.enums.actions', [])
  .constant('actionEnums', {
    AVAILABLE_ACTIONS: {
      REPORT_EMPTY: {
        value: 1,
        description: 'Report Empty',
        phase: 1
      },
      REPORT_ARRIVAL_AT_PICKUP: {
        value: 2,
        description: 'Report Arrival At Pickup',
        phase: 1
      },
      REPORT_LOADED: {
        value: 3,
        description: 'Report Loaded',
        phase: 1
      },
      SEND_LOAD_UPDATE: {
        value: 4,
        description: 'Send Load Update',
        phase: 2
      },
      TRAILER_DROP_AT_YARD: {
        value: 5,
        description: 'Trailer Drop At Yard',
        phase: 2
      },
      TRAILER_PICKUP_AT_YARD: {
        value: 6,
        description: 'Trailer Pickup At Yard',
        phase: 2
      },
      REPORT_LOCATION: {
        value: 7,
        description: 'Report Location',
        phase: 2
      },
      REPORT_ARRIVAL_AT_DELIVERY: {
        value: 8,
        description: 'Report Arrival At Delivery',
        phase: 2
      },
      REPORT_DELIVERY: {
        value: 9,
        description: 'Report Delivery',
        phase: 2
      },
      ADD_DOCUMENTS: {
        value: 10,
        description: 'Add Documents',
        phase: 3
      }
    },
    LAST_ACTION: {
      BOOKED: {
        value: 1,
        description: 'Reported Empty'
      },
      DRIVER_ASSIGNED: {
        value: 2,
        description: 'Reported Arrival At Pickup'
      },
      REPORTED_EMPTY: {
        value: 3,
        description: 'Document Added'
      },
      REPORTED_ARRIVAL_AT_PICKUP: {
        value: 4,
        description: 'Reported Loaded'
      },
      REPORTED_STILL_WAITING_TO_LOAD: {
        value: 5,
        description: 'Reported Arrival At Delivery'
      },
      REPORTED_LOADED: {
        value: 6,
        description: 'Reported Unloaded'
      },
      DO_NOT_DISTURB_ON: {
        value: 7,
        description: 'Driver Assigned'
      },
      REPORTED_DROPPED: {
        value: 8,
        description: 'Reported Still Waiting To Load'
      },
      TRAILER_PICKED_UP: {
        value: 9,
        description: 'Do Not Disturb On'
      },
      REPORTED_ARRIVAL_AT_DELIVERY: {
        value: 10,
        description: 'Trailer Picked Up'
      },
      REPORTED_STILL_WAITING_TO_UNLOAD: {
        value: 11,
        description: 'Reported Still Waiting To Unload'
      },
      REPORTED_DELIVERED: {
        value: 12,
        description: 'Reported Location - Carrier Portal'
      },
      DOCUMENT_ADDED: {
        value: 13,
        description: 'Trailer Dropped'
      },
      REPORTED_LOCATION: {
        value: 14,
        description: 'Reported Location - Mobile Tracking'
      },
      TRAILER_DROPPED: {
        value: 15,
        description: 'Booked'
      }
    }
  });
