
module.exports = {
  api: {
    carriers: '/mock/api/v1/carriers',
    carrierById: '/mock/api/v1/carriers/:carrierId',
    createPassword: '/mock/api/v1/users/:userId/createPassword',
    repByCarrierId: '/mock/api/v1/carriers/:carrierId/echorep',
    portalUsers: '/mock/api/v1/carriers/:carrierId/portalusers',
    driverCount: '/mock/api/v1/carriers/:carrierId/drivers/count',
    users: '/mock/api/v1/users',
    forgotPassword: '/mock/api/v1/auth/forgotPassword',
    signIn: '/mock/api/v1/auth/signIn',
    signOut: '/mock/api/v1/auth/signOut',
    refresh: '/mock/api/v1/refresh',
    userById: '/mock/api/v1/users/:userId',
    deactivateUserById: '/mock/api/v1/users/:userId/deactivate'
  }
};