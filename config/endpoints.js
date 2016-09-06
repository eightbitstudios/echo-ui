module.exports = {
  availableLoadsByCarrierId: '/api/v1/carriers/${carrierId}/loads/active',
  unbilledLoadsByCarrierId: '/api/v1/carriers/${carrierId}/loads/unbilled',
  upcomingLoadsByCarrierId: '/api/v1/carriers/${carrierId}/loads/upcoming',
  loadCountByCarrierId: '/api/v1/carriers/${carrierId}/loads/count',
  loadsBySearchText: '/api/v1/carriers/${carrierId}/loads/${searchText}',
  carriers: '/api/v1/carriers',
  carrierById: '/api/v1/carriers/${carrierId}',
  userById: '/api/v1/users/${userId}',
  deactivateUserById: '/api/v1/users/${userId}/deactivate',
  user: '/api/v1/users',
  signIn: '/api/v1/auth/signIn',
  signOut: '/api/v1/auth/signOut',
  refresh: '/api/v1/auth/refresh/${userId}',
  createPassword: '/api/v1/users/${userId}/createPassword',
  repByCarrierId: '/api/v1/carriers/${carrierId}/echorep',
  portalUsers: '/api/v1/carriers/${carrierId}/portalusers',
  driverCount: '/api/v1/carriers/${carrierId}/drivers/count',
  drivers: '/api/v1/carriers/${carrierId}/drivers',
  driver: '/api/v1/users/drivers',
  driverById: '/api/v1/users/drivers/${driverId}',
  searchDrivers: '/api/v1/carriers/${carrierId}/drivers/${searchTerm}',
  portalUserById: '/api/v1/carriers/${carrierId}/portalusers/${userId}',
  language: '/api/v1/preferredLanguages',
  forgotPassword: '/api/v1/auth/forgotPassword',
  loadById: '/api/v1/loads/${loadId}/details',
  changePassword: '/api/v1/users/${userId}/setPassword',
  loadsNeedingAction: '/api/v1/carriers/${carrierId}/loads/needsAction',
  multiStopLoads: '/api/v1/carriers/${carrierId}/loads/upcomingMultiStop',
  location: '/api/v1/location',
  timeZones: '/api/v1/timezones',
  assignDriverByLoadId: '/api/v1/loads/${loadId}/assign/${userId}',
  unassignDriverByLoadId: '/api/v1/loads/${loadId}/unassign',
  reassignDriverByLoadId: '/api/v1/loads/${loadId}/reassign/${userId}',
  unassignedDriversByLoadId: '/api/v1/carriers/${carrierId}/loads/${loadId}/unassignedDrivers',
  driverStatusByLoadId: '/api/v1/loads/${loadId}/driver/${userId}/status',
  reportEmptyByLoadGuid: '/api/v1/loads/${loadGuid}/reportEmpty',
  reportLoadedByLoadGuid: '/api/v1/loads/${loadGuid}/reportLoaded',
  itemsByLoadGuid: '/api/v1/loads/${loadGuid}/items',
};