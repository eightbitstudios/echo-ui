module.exports = { 
  loads: [{
  loadNumber: 12344321,
  proNumber: 12345678910,
  bolNumber: 1412341234,
  generalInstructions: 'Test general instructions',
  equipmentName: [{
    name: 'Equiment 1'
  },{
    name: 'Equiment 2'
  },{
    name: 'Equiment 3'
  },{
    name: 'Equiment 4'
  }],
  trailerNumber: '512341234',
  pickUp: [{
    name: 'Test 1',
    address: '1234 Test St.',
    city: 'Memphis',
    state: 'TN',
    zip: '60655',
    day: 'Tuesday',
    time: '14:00 CST',
    contactName: 'Bill Test',
    contactPhone: '1235125454',
    notes: 'Test note',
    items: [{
      quantity: 2,
      description: 'Floor Handling Unit',
      estimatedWeight: '1000  lbs'
    },{
      quantity: 1,
      description: 'Floor Handling Unit',
      estimatedWeight: '800  lbs'
    },{
      quantity: 5,
      description: 'Floor Handling Unit',
      estimatedWeight: '2500  lbs'
    },{
      quantity: 2,
      description: 'Floor Handling Unit',
      estimatedWeight: '100  lbs'
    },{
      quantity: 1,
      description: 'Floor Handling Unit',
      estimatedWeight: '100  lbs'
    },{
      quantity: 5,
      description: 'Floor Handling Unit',
      estimatedWeight: '100  lbs'
    },{
      quantity: 2,
      description: 'Floor Handling Unit',
      estimatedWeight: '100  lbs'
    },{
      quantity: 1,
      description: 'Floor Handling Unit',
      estimatedWeight: '100  lbs'
    },{
      quantity: 5,
      description: 'Floor Handling Unit',
      estimatedWeight: '100  lbs'
    }]
  }],
  delivery: [{
    name: 'Test 2',
    address: '1234 Test St.',
    city: 'Memphis',
    state: 'TN',
    zip: '60655',
    day: 'Tuesday',
    time: '14:00 CST',
    contactName: 'Bill Test',
    contactPhone: '1235125454',
    notes: 'DROP trailer 24/7.STRICT DELIVERY DATE. ***TRAILER WILL NOT GET UNLOADED UNTIL THE END OF THE DELIVERY WINDOW DATE*** Can drop @ anytime. DROP trailer 24/7.STRICT DELIVERY DATE. ***TRAILER WILL NOT GET UNLOADED UNTIL THE END OF THE DELIVERY WINDOW DATE*** Can drop @ anytime. DROP trailer 24/7.STRICT DELIVERY DATE. ***TRAILER WILL NOT GET UNLOADED UNTIL THE END OF THE DELIVERY WINDOW DATE*** Can drop @ anytime',
    items: [{
      quantity: 2,
      description: 'Floor Handling Unit',
      estimatedWeight: 1000
    },{
      quantity: 1,
      description: 'Floor Handling Unit',
      estimatedWeight: 800
    },{
      quantity: 5,
      description: 'Floor Handling Unit',
      estimatedWeight: 2500
    }]
  }],
  driver: {
    id: 1,
    isDoNotDisturb: false,
    firstName: 'Fred',
    lastName: 'Fernando',
    phone: '8895840803',
    tractorNumber: '1241234',
    isTrackingEnabled: true
  },
  action: {
    currentStatus: 'ReportedEmpty',
    actionByUser: {
      firstName: 'Mike',
      lastName: 'Potatoe'
    },
    time: '1473417000',
    nextAction: 'ReportArrivalAtpickUp',
    onTime: true,
    lateBy: null
  },
  isLoadDetailUpdated: false
}, {
      loadNumber: 12344321,
      proNumber: null,
    pickUp: [{
      city: 'New York',
      state: 'New York',
      zip: '60655',
      isCurrent: false,
      time: '2016-08-02T16:20:14-05:00'
    }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Tim',
        lastName: 'Potatoe'
      },
      time: '2016-08-04T16:20:14-05:00',
      nextAction: 'ReportArrivalAtpickUp',
      onTime: false,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Tim',
        lastName: 'Potatoe'
      },
      time: '2016-08-04T16:20:14-05:00',
      nextAction: 'ReportLoaded',
      onTime: false,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Mike',
        lastName: 'Potatoe'
      },
      time: '1473417000',
      nextAction: 'ReportArrivalAtpickUp',
      onTime: true,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Tim',
        lastName: 'Potatoe'
      },
      time: '2016-08-04T16:20:14-05:00',
      nextAction: 'ReportArrivalAtpickUp',
      onTime: false,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Tim',
        lastName: 'Potatoe'
      },
      time: '2016-08-04T16:20:14-05:00',
      nextAction: 'ReportLoaded',
      onTime: false,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Mike',
        lastName: 'Potatoe'
      },
      time: '1473417000',
      nextAction: 'ReportArrivalAtpickUp',
      onTime: true,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Tim',
        lastName: 'Potatoe'
      },
      time: '2016-08-04T16:20:14-05:00',
      nextAction: 'ReportArrivalAtpickUp',
      onTime: false,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Tim',
        lastName: 'Potatoe'
      },
      time: '2016-08-04T16:20:14-05:00',
      nextAction: 'ReportLoaded',
      onTime: false,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Tim',
        lastName: 'Potatoe'
      },
      time: '2016-08-04T16:20:14-05:00',
      nextAction: 'ReportLoaded',
      onTime: false,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Tim',
        lastName: 'Potatoe'
      },
      time: '2016-08-04T16:20:14-05:00',
      nextAction: 'ReportLoaded',
      onTime: false,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }, {
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
    action: {
      currentStatus: 'ReportedEmpty',
      actionByUser: {
        firstName: 'Tim',
        lastName: 'Potatoe'
      },
      time: '2016-08-04T16:20:14-05:00',
      nextAction: 'ReportLoaded',
      onTime: false,
      lateBy: null
    },
    isLoadDetailUpdated: false
  }],
  totalLoadCount: 22
};