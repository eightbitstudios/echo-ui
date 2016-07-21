
module.exports = {
  api: {
    carriers: '/api/v1/carriers',
    carrierById: '/api/v1/carriers/:carrierId',
    createPassword: '/api/v1/users/:userId/createPassword',
    forgotPassword: '/api/v1/auth/forgotPassword',
    repByCarrierId: '/api/v1/carriers/:carrierId/echorep',
    portalUsers: '/api/v1/carriers/:carrierId/portalusers',
    driverCount: '/api/v1/carriers/:carrierId/drivers/count',
    users: '/api/v1/users',
    signIn: '/api/v1/auth/signIn',
    userById: '/api/v1/users/:userId',
    deactivateUserById: '/api/v1/users/:userId/deactivate'
  }
};