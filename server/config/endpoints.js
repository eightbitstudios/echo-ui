
module.exports = {
  api: {
    carriers: '/api/v1/carriers',
    carrierById: '/api/v1/carriers/:carrierId',
    repByCarrierId: '/api/v1/carriers/:carrierId/echorep',
    portalUsers: '/api/v1/carriers/:carrierId/portalusers',
    driverCount: '/api/v1/carriers/:carrierId/drivers/count',
    userById: '/api/v1/user/:userId',
    portalUserById: '/api/v1/carriers/:carrierId/portalusers/:userId'
  }
};