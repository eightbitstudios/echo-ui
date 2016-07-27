
module.exports = {
  api: {
    carriers: '/mock/api/v1/carriers',
    carrierById: '/mock/api/v1/carriers/:carrierId',
    createPassword: '/mock/api/v1/users/:userId/createPassword',
    repByCarrierId: '/mock/api/v1/carriers/:carrierId/echorep',
    portalUsers: '/mock/api/v1/carriers/:carrierId/portalusers',
    driverCount: '/mock/api/v1/carriers/:carrierId/drivers/count',
    users: '/mock/api/v1/users',
    userById: '/mock/api/v1/users/:userId',
    signIn: '/mock/api/v1/signIn',
    driverById: '/mock/api/v1/carriers/:carrierId/drivers/:driverId',
    deactivateDriverById: '/mock/api/v1/carriers/:carrierId/drivers/:driverId/deactivate',
    deactivateUserById: '/mock/api/v1/users/:userId/deactivate',
    drivers: '/mock/api/v1/carriers/:carrierId/drivers',
    language: '/mock/api/v1/preferredLanguages'
  }
};