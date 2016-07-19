
module.exports = {
  api: {
    carriers: '/api/v1/carriers',
    carrierById: '/api/v1/carriers/:carrierId',
    createPassword: '/api/v1/users/:userId/createPassword',
    repByCarrierId: '/api/v1/carriers/:carrierId/echorep',
    portalUsers: '/api/v1/carriers/:carrierId/portalusers',
    driverCount: '/api/v1/carriers/:carrierId/drivers/count',
    users: '/api/v1/users',
    userById: '/api/v1/users/:userId',
    deactivateUserById: '/api/v1/users/:userId/deactivate'
  }
};