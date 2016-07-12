
module.exports = {
  api: {
    carriers: '/api/v1/carriers',
    carrierById: '/api/v1/carriers/:carrierId',
    repByCarrierId: '/api/v1/carriers/:carrierId/rep',
    userById: '/api/v1/user/:userId',
    portalUsers: '/api/v1/carriers/:carrierId/portalUsers',
    driverCount: '/api/v1/carriers/:carrierId/drivers/count',
    portalUserById: '/api/v1/carriers/:carrierId/portal-users/:userId'
  }
};