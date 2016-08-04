module.exports = [{
  load: {
    loadNumber: 12344321,
    proNumber: 12345678910
  },
  pickup: {
    address: {
      city: 'Memphis',
      state: 'TN',
      zip: '60655',
    },
    time: '2014-03-24T01:15:000'
  },
  delivery: {
    address: {
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
    },
    time: '2014-03-24T01:15:000'
  },
  driver: {
    id: 1,
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
    time: '2014-03-24T01:15:000',
    nextAction: 'ReportArrivalAtPickup',
    onTime: true,
    lateBy: null
  },
  isLoadDetailUpdated: false
}, {
  load: {
    loadNumber: 12344321,
    proNumber: null
  },
  pickup: {
    address: {
      city: 'New York',
      state: 'New York',
      zip: '60655',
    },
    time: '2014-03-24T01:15:000'
  },
  delivery: {
    address: {
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
    },
    time: '2014-03-24T01:15:000'
  },
  driver: {
    id: 1,
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
    time: '2014-03-24T01:15:000',
    nextAction: 'ReportArrivalAtPickup',
    onTime: false,
    lateBy: null
  },
  isLoadDetailUpdated: false
}];