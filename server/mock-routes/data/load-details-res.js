module.exports = {
  loadNumber: 12344321,
  proNumber: 12345678910,
  stops: [{
    stopType: 'Pickup',
    arrivalDate: 'Today from 14:00-15:00 EST',
    contactName: 'Bob Peterson',
    contactPhone: '3125551212',
    name: 'Walmart Warehouse A34',
    address1: '555 W. Western',
    address2: 'Dock #123',
    city: 'Bartville',
    state: 'IN',
    zip: '60655',
    notes: 'Test note',
    shipmentItems: [{
      itemNumber: '',
      itemName: '',
      estimatedWeight: '',
      quantity: '',
      description: ''
    }]
  }, {
      stopType: 'Delivery',
      arrivalDate: 'Today from 14:00-15:00 EST',
      contactName: 'Bob Peterson',
      contactPhone: '3125551212',
      name: 'Walmart Warehouse A34',
      address1: '555 W. Western',
      address2: 'Dock #123',
      city: 'Bartville',
      state: 'IN',
      zip: '60655',
      notes: 'Test note',
      shipmentItems: [{
        itemNumber: '',
        itemName: '',
        estimatedWeight: '',
        quantity: '',
        description: ''
      }]
    }],
  driver: {
    id: 1,
    isDoNotDisturb: false,
    firstName: 'Fred',
    lastName: 'Fernando',
    phone: '8895840803',
    isTrackingEnabled: true
  },
  isLoadDetailUpdated: false
};