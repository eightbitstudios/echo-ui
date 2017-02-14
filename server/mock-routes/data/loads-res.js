module.exports = {
  loads: [{
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
    "loadNumber": 2345675,
    "proNumber": "1200987860859657",
    "bolNumber": "56765676",
    "pickUp": [{
      "pickupNumber": 56985478,
      "name": "Walmart Warehouse",
      "address": "123 Main Street",
      "city": "New York City",
      "state": "NY",
      "zip": "85674",
      "country": "USA",
      "time": "14:00-16:00 ET",
      formattedDayTime: 'Today from 16:00-21:00',
      day: 'Today',
      "orderOfService": 1,
      "isCurrent": true,
      "contactName": "David Hann",
      "contactPhone": "(346)-869-8526",
      "notes": "Test instructions for the pickup",
      "items": [{
        "itemGuid": "8d57b2026c2649bd9d1c81e37e961a37",
        "hazmat": true,
        "estimatedWeight": 1300.5,
        "quantity": 5,
        "handlingUnit": "Floor Handling Unit",
        "description": "Shoe Pallets"
      }, {
          "itemGuid": "7e6cd197afa1455485032295ec83308b",
          "hazmat": true,
          "estimatedWeight": 780,
          "quantity": 1,
          "handlingUnit": "Floor Handling Unit",
          "description": "Paper Goods"
        }],
      "stopTotalWeightInPounds": 2080.5
    }],
    escalationLevel: 2,
    "delivery": [{
      "pickupNumber": 56985478,
      "name": "Walmart Supercenter",
      "address": "123 North Avenue",
      "city": "Chicago",
      "state": "IL",
      "zip": "60696",
      "country": "USA",
      formattedDayTime: 'Fri, May 23 CT from 16:00-21:00',
      "time": "16:00-21:00 CT",
      day: 'Fri, May 23',
      "orderOfService": 1,
      "isCurrent": true,
      "contactName": "Chris Matthew",
      "contactPhone": "(312)-869-9638",
      "notes": "Test instructions for the delivery",
      "items": [{
        "itemGuid": "dd3d90f6c12d4657b5768a89f067437d",
        "hazmat": true,
        "estimatedWeight": 1300.5,
        "quantity": 5,
        "handlingUnit": "Floor Handling Unit",
        "description": "Shoe Pallets"
      }, {
          "itemGuid": "bda7ca54a5cf4d9fa3e61b7ba14fb8ed",
          "hazmat": true,
          "estimatedWeight": 780,
          "quantity": 1,
          "handlingUnit": "Floor Handling Unit",
          "description": "Paper Goods"
        }],
      "stopTotalWeightInPounds": 2080.5
    }],
    "driver": {
      "id": 1,
      "firstName": "Sam",
      "lastName": "Smith",
      "phone": "13124551234",
      "isActive": false,
      "preferredLanguage": "English",
      "tractorNumber": "1111 8525",
      "isAppInstalled": true,
      "isTrackingEnabled": false,
      "isDoNotDisturb": true
    },
    nextAction: {
      lastAction: 15,
      firstName: 'Tim',
      lastName: 'Potatoe',
      actionPerformedOn: '13:50 CST Today',
      nextAction: 9,
      onTime: false,
      lateBy: null
    },
    "isDetailsUpdated": false,
    "assignedByEcho": false,
    "generalInstructions": "Test Load Detail",
    "equipments": [      {
      "id": 15268,
      "displayName": "Dry Van",
      "isSpecialService": false
    }, {
        "id": 15269,
        "displayName": "Hazmat",
        "isSpecialService": false
      }, {
        "id": 28569,
        "displayName": "Drop Trailer At Shipper",
        "isSpecialService": true
      }, {
        "id": 25697,
        "displayName": "No Reefers",
        "isSpecialService": true
      }    ],
    "trailerNumber": "8956 7412",
    "tractorNumber": "7894 9216",
    "sumOfWeightInPounds": 2080.5,
    "podsRequired": 1,
    "invoiceRequired": true
  }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 12344321,
      proNumber: null,
      pickUp: [{
        pickupNumber: 56985478,
        city: 'New York',
        state: 'New York',
        zip: '60655',
        isCurrent: false,
        time: '2016-08-02T16:20:14-05:00'
      }, {
          pickupNumber: 5698543478,
          city: 'LA',
          state: 'California',
          zip: '60655',
          isCurrent: true,
          time: '2016-08-02T16:20:14-05:00'
        }],
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: true,
        time: '2016-08-08T16:20:14-05:00'
      }],
      driver: {
        id: 1,
        isDoNotDisturb: true,
        firstName: 'John',
        lastName: 'Smith',
        phone: '8895351903',
        isTrackingEnabled: false
      },
      escalationLevel: 3,
      nextAction: {
        lastAction: 1,
        firstName: 'Tim',
        lastName: 'Potatoe',
        actionPerformedOn: '13:50 CST Today',
        nextAction: 2,
        onTime: false,
        lateBy: null
      },
      isLoadDetailUpdated: false,
      isDriverVerified: true,
    "podsRequired": 2,
    "invoiceRequired": true
    }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 12344321,
      proNumber: null,
      pickUp: [{
        city: 'New York',
        state: 'New York',
        zip: '60655',
        time: '2016-08-02T16:20:14-05:00'
      }],
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: false,
        time: '2016-08-08T16:20:14-05:00'
      }, {
          city: 'St. Louis',
          state: 'MO',
          zip: '60601',
          isCurrent: true,
          time: '2016-08-08T16:20:14-05:00'
        }],
      driver: {},
      nextAction: {
        lastAction: 1,
        firstName: 'Tim',
        lastName: 'Potatoe',
        actionPerformedOn: '09:34 CST Tue, Oct 04',
        nextAction: 3,
        onTime: false,
        lateBy: null
      },
      isLoadDetailUpdated: false,
    "podsRequired": 0,
    "invoiceRequired": true
    }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 12344321,
      proNumber: 12345678910,
      pickUp: [{
        city: 'Memphis',
        state: 'TN',
        zip: '60655',
        time: '2016-08-04T16:20:14-05:00'
      }],
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: true,
        time: '2016-08-05T16:20:14-05:00'
      }],
      driver: {
        id: 1,
        isDoNotDisturb: false,
        firstName: 'Fred',
        lastName: 'Fernando',
        phone: '8895840803',
        isTrackingEnabled: true
      },
      nextAction: {
        lastAction: 1,
        firstName: 'Tim',
        lastName: 'Potatoe',
        time: '1473417000',
        nextAction: 1,
        actionPerformedOn: '13:50 CST Today',
        onTime: true,
        lateBy: null
      },
      isLoadDetailUpdated: false,
    "podsRequired": 0,
    "invoiceRequired": true
    }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 12344321,
      proNumber: null,
      pickUp: [{
        city: 'New York',
        state: 'New York',
        zip: '60655',
        time: '2016-08-02T16:20:14-05:00'
      }],
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: true,
        time: '2016-08-08T16:20:14-05:00'
      }],
      driver: {
        id: 1,
        isDoNotDisturb: true,
        firstName: 'John',
        lastName: 'Smith',
        phone: '8895351903',
        isTrackingEnabled: false
      },
      nextAction: {
        lastAction: 1,
        firstName: 'Tim',
        lastName: 'Potatoe',
        actionPerformedOn: '13:50 CST Today',
        nextAction: 4,
        onTime: false,
        lateBy: null
      },
      isLoadDetailUpdated: false,
    "podsRequired": 1,
    "invoiceRequired": false
    }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 12344321,
      proNumber: null,
      pickUp: [{
        city: 'New York',
        state: 'New York',
        zip: '60655',
        time: '2016-08-02T16:20:14-05:00'
      }],
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: false,
        time: '2016-08-08T16:20:14-05:00'
      }, {
          city: 'St. Louis',
          state: 'MO',
          zip: '60601',
          isCurrent: true,
          time: '2016-08-08T16:20:14-05:00'
        }],
      driver: {},
      nextAction: {
        lastAction: 1,
        firstName: 'Tim',
        lastName: 'Potatoe',
        actionPerformedOn: '13:50 CST Today',
        nextAction: 3,
        onTime: false,
        lateBy: null
      },
      isLoadDetailUpdated: false,
    "podsRequired": 2,
    "invoiceRequired": false
    }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 12344321,
      proNumber: 12345678910,
      pickUp: [{
        city: 'Memphis',
        state: 'TN',
        zip: '60655',
        time: '2016-08-04T16:20:14-05:00'
      }],
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: true,
        time: '2016-08-05T16:20:14-05:00'
      }],
      driver: {
        id: 1,
        isDoNotDisturb: false,
        firstName: 'Fred',
        lastName: 'Fernando',
        phone: '8895840803',
        isTrackingEnabled: true
      },
      nextAction: {
        lastAction: 1,
        firstName: 'Mike',
        lastName: 'Potatoe',
        actionPerformedOn: '13:50 CST Today',
        nextAction: 4,
        onTime: true,
        lateBy: null
      },
      isLoadDetailUpdated: false,
    "podsRequired": 0,
    "invoiceRequired": false
    }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 12344321,
      proNumber: null,
      pickUp: [{
        city: 'New York',
        state: 'New York',
        zip: '60655',
        time: '2016-08-02T16:20:14-05:00'
      }],
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: true,
        time: '2016-08-08T16:20:14-05:00'
      }],
      driver: {
        id: 1,
        isDoNotDisturb: true,
        firstName: 'John',
        lastName: 'Smith',
        phone: '8895351903',
        isTrackingEnabled: false
      },
      nextAction: {
        lastAction: 1,
        firstName: 'Tim',
        lastName: 'Potatoe',
        actionPerformedOn: '13:50 CST Today',
        nextAction: 1,
        onTime: false,
        lateBy: null
      },
      isLoadDetailUpdated: false
    }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 5555555555,
      proNumber: null,
      pickUp: [{
        city: 'New York',
        state: 'New York',
        zip: '60655',
        time: '2016-08-02T16:20:14-05:00'
      }],
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: false,
        time: '2016-08-08T16:20:14-05:00'
      }, {
          city: 'St. Louis',
          state: 'MO',
          zip: '60601',
          isCurrent: true,
          time: '2016-08-08T16:20:14-05:00'
        }],
      driver: {},
      nextAction: {
        lastAction: 1,
        firstName: 'Tim',
        lastName: 'Potatoe',
        actionPerformedOn: '13:50 CST Today',
        nextAction: 1,
        onTime: false,
        lateBy: null
      },
      isLoadDetailUpdated: false,
    "podsRequired": 1,
    "invoiceRequired": false
    }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 12344321,
      proNumber: null,
      pickUp: [{
        city: 'New York',
        state: 'New York',
        zip: '60655',
        time: '2016-08-02T16:20:14-05:00'
      }],
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: false,
        time: '2016-08-08T16:20:14-05:00'
      }, {
          city: 'St. Louis',
          state: 'MO',
          zip: '60601',
          isCurrent: true,
          time: '2016-08-08T16:20:14-05:00'
        }],
      driver: {},
      nextAction: {
        lastAction: 1,
        firstName: 'Tim',
        lastName: 'Potatoe',
        actionPerformedOn: '13:50 CST Today',
        nextAction: 10,
        onTime: false,
        lateBy: null
      },
      isLoadDetailUpdated: false,
    "podsRequired": 1,
    "invoiceRequired": false
    }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 12344321,
      proNumber: null,
      pickUp: {
        city: 'New York',
        state: 'New York',
        zip: '60655',
        time: '2016-08-02T16:20:14-05:00'
      },
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: false,
        time: '2016-08-08T16:20:14-05:00'
      }, {
          city: 'St. Louis',
          state: 'MO',
          zip: '60601',
          isCurrent: true,
          time: '2016-08-08T16:20:14-05:00'
        }],
      driver: {},
      nextAction: {
        lastAction: 1,
        firstName: 'Tim',
        lastName: 'Potatoe',
        actionPerformedOn: '13:50 CST Today',
        nextAction: 1,
        onTime: false,
        lateBy: null
      },
      isLoadDetailUpdated: false,
    "podsRequired": 1,
    "invoiceRequired": false
    }, {
    "loadGuid": "8d34ba4f8baa4cd09c776826df55bae1",
      loadNumber: 12344321,
      proNumber: null,
      pickUp: {
        city: 'New York',
        state: 'New York',
        zip: '60655',
        time: '2016-08-02T16:20:14-05:00'
      },
      delivery: [{
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        isCurrent: false,
        time: '2016-08-08T16:20:14-05:00'
      }, {
          city: 'St. Louis',
          state: 'MO',
          zip: '60601',
          isCurrent: true,
          time: '2016-08-08T16:20:14-05:00'
        }],
      driver: {},
      nextAction: {
        lastAction: 1,
        firstName: 'Tim',
        lastName: 'Potatoe',
        actionPerformedOn: '13:50 CST Today',
        nextAction: 1,
        onTime: false,
        lateBy: null
      },
      isLoadDetailUpdated: false,
    "podsRequired": 1,
    "invoiceRequired": false
    }],
  totalLoadCount: 22
};
