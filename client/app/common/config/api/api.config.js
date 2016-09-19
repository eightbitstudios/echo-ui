angular.module('echo.config.api', [])
  .constant('apiConfig', {
    availableLoadsByCarrierId: _.template('@availableLoadsByCarrierId@'),
    unbilledLoadsByCarrierId: _.template('@unbilledLoadsByCarrierId@'),
    upcomingLoadsByCarrierId: _.template('@upcomingLoadsByCarrierId@'),
    loadCountByCarrierId: _.template('@loadCountByCarrierId@'),
    loadsBySearchText: _.template('@loadsBySearchText@'),
    carriers: '@carriers@',
    carrierById: _.template('@carrierById@'),
    userById: _.template('@userById@'),
    deactivateUserById: _.template('@deactivateUserById@'),
    user: '@user@',
    createPassword: _.template('@createPassword@'),
    signIn: '@signIn@',
    signOut: '@signOut@',
    refresh: _.template('@refresh@'),
    repByCarrierId:  _.template('@repByCarrierId@'),
    forgotPassword: '@forgotPassword@',
    changePassword: _.template('@changePassword@'),
    portalUsers: _.template('@portalUsers@'),
    driverCount: _.template('@driverCount@'),
    portalUserById: _.template('@portalUserById@'),
    drivers: _.template('@drivers@'),
    driver: '@driver@',
    driverById: _.template('@driverById@'),
    searchDrivers: _.template('@searchDrivers@'),
    loadsNeedingAction: _.template('@loadsNeedingAction@'),
    loadById: _.template('@loadById@'),
    multiStopLoads: _.template('@multiStopLoads@'),
    language: '@language@',
    assignDriverByLoadId: _.template('@assignDriverByLoadId@'),
    unassignDriverByLoadId: _.template('@unassignDriverByLoadId@'),
    reassignDriverByLoadId: _.template('@reassignDriverByLoadId@'),
    unassignedDriversByLoadId: _.template('@unassignedDriversByLoadId@'),
    driverStatusByLoadId: _.template('@driverStatusByLoadId@'),
    location: '@location@',
    activityLogByLoadId: _.template('@activityLogByLoadId@'),
    proNumberByLoadId: _.template('@proNumberByLoadId@'),
    trailerNumberByLoadId: _.template('@trailerNumberByLoadId@'),
    timeZones: '@timeZones@',
    itemsByLoadGuid: _.template('@itemsByLoadGuid@'),
    reportEmptyByLoadGuid: _.template('@reportEmptyByLoadGuid@'),
    reportLoadedByLoadGuid: _.template('@reportLoadedByLoadGuid@'),
    reportArrivalByLoadGuid: _.template('@reportArrivalByLoadGuid@'),
    loadUpdateOptionsByLoadGuid: _.template('@loadUpdateOptionsByLoadGuid@'),
    reportLocation: _.template('@reportLocation@'),
    reportTrailerByLoadGuid: _.template('@reportTrailerByLoadGuid@'),
    reportDeliveredByLoadGuid: _.template('@reportDeliveredByLoadGuid@')
  });
