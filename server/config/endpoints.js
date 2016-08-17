
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
    deactivateDriverById: '/mock/api/v1/carriers/:carrierId/drivers/:driverId/deactivate',
    deactivateUserById: '/mock/api/v1/users/:userId/deactivate',
    drivers: '/mock/api/v1/carriers/:carrierId/drivers',
    language: '/mock/api/v1/preferredLanguages'
  }
};