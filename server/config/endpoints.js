
module.exports = {
  api: {
    carriers: '/api/v1/carriers',
    carrierById: '/api/v1/carriers/:carrierId',
    repByCarrierId: '/api/v1/carriers/:carrierId/echorep',
    portalUsers: '/api/v1/carriers/:carrierId/portalusers',
    driverCount: '/api/v1/carriers/:carrierId/drivers/count',
    userById: '/api/v1/users/:userId',
    deactivateUserById: '/api/v1/users/:userId/deactivate'
  }
};