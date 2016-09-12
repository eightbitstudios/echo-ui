
module.exports = {
  api: {
    availableLoadsByCarrierId: '/mock/api/v1/carriers/:carrierId/loads/active',
    unbilledLoadsByCarrierId: '/mock/api/v1/carriers/:carrierId/loads/unbilled',
    upcomingLoadsByCarrierId: '/mock/api/v1/carriers/:carrierId/loads/upcoming',
    loadCountByCarrierId: '/mock/api/v1/carriers/:carrierId/loads/count',
    loadsBySearchText: '/mock/api/v1/carriers/:carrierId/loads/:searchText',
    carriers: '/mock/api/v1/carriers',
    carrierById: '/mock/api/v1/carriers/:carrierId',
    createPassword: '/mock/api/v1/users/:userId/createPassword',
    repByCarrierId: '/mock/api/v1/carriers/:carrierId/echorep',
    portalUsers: '/mock/api/v1/carriers/:carrierId/portalusers',
    driverCount: '/mock/api/v1/carriers/:carrierId/drivers/count',
    users: '/mock/api/v1/users',
    changePassword: '/mock/api/v1/users/:userId/setPassword',
    forgotPassword: '/mock/api/v1/auth/forgotPassword',
    signIn: '/mock/api/v1/auth/signIn',
    signOut: '/mock/api/v1/auth/signOut',
    refresh: '/mock/api/v1/auth/refresh/:userId',
    userById: '/mock/api/v1/users/:userId',
    driverById: '/mock/api/v1/users/drivers/:driverId',
    searchDrivers: '/mock/api/v1/carriers/:carrierId/drivers/:searchTerm',
    deactivateDriverById: '/mock/api/v1/carriers/:carrierId/drivers/:driverId/deactivate',
    deactivateUserById: '/mock/api/v1/users/:userId/deactivate',
    drivers: '/mock/api/v1/carriers/:carrierId/drivers',
    loadById: '/mock/api/v1/loads/:loadId/details',
    language: '/mock/api/v1/preferredLanguages',
    location: '/mock/api/v1/location',
    timeZones: '/mock/api/v1/timezones',
    loadsNeedingAction: '/mock/api/v1/carriers/:carrierId/loads/needsAction',
    multiStopLoads: '/mock/api/v1/carriers/:carrierId/loads/upcomingMultiStop',
    assignDriverByLoadId: '/mock/api/v1/loads/:loadId/assign/:userId',
    unassignDriverByLoadId: '/mock/api/v1/loads/:loadId/unassign',
    reassignDriverByLoadId: '/mock/api/v1/loads/:loadId/reassign/:userId',
    unassignedDriversByLoadId: '/mock/api/v1/carriers/:carrierId/loads/:loadId/unassignedDrivers',
    driverStatusByLoadId: '/mock/api/v1/loads/:loadId/driver/:userId/status',
    reportEmptyByLoadGuid: '/mock/api/v1/loads/:loadGuid/reportEmpty',
    activityLogByLoadId: '/mock/api/v1/loads/:loadId/activity',
    reportArrivalByLoadGuid: '/mock/api/v1/loads/:loadGuid/reportArrival',
    loadUpdateOptionsByLoadGuid: '/mock/api/v1/loads/:loadGuid/loadUpdateOptions',
    reportLocation: '/mock/api/v1/loads/:loadGuid/reportLocation',
    proNumberByLoadId: '/mock/api/v1/loads/:loadId/proNumber',
    trailerNumberByLoadId: '/mock/api/v1/loads/:loadId/trailerNumber'
  }
};
