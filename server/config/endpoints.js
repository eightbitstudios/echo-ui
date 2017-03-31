
module.exports = {
  api: {
    availableLoadsByCarrierId: '/api/v1/carriers/:carrierId/loads/active',
    unbilledLoadsByCarrierId: '/api/v1/carriers/:carrierId/loads/unbilled',
    upcomingLoadsByCarrierId: '/api/v1/carriers/:carrierId/loads/upcoming',
    loadCountByCarrierId: '/api/v1/carriers/:carrierId/loads/count',
    loadsBySearchText: '/api/v1/carriers/:carrierId/loads/:searchText',
    carriers: '/api/v1/carriers',
    carrierById: '/api/v1/carriers/:carrierId',
    createPassword: '/api/v1/users/:userId/createPassword',
    repByCarrierId: '/api/v1/carriers/:carrierId/echorep',
    portalUsers: '/api/v1/carriers/:carrierId/portalusers',
    driverCount: '/api/v1/carriers/:carrierId/drivers/count',
    users: '/api/v1/users',
    changePassword: '/api/v1/users/:userId/setPassword',
    forgotPassword: '/api/v1/auth/forgotPassword',
    signIn: '/api/v1/auth/signIn',
    signOut: '/api/v1/auth/signOut',
    refresh: '/api/v1/auth/refresh/:userId',
    userById: '/api/v1/users/:userId',
    resendInviteToUserById: '/api/v1/users/:userId/resendInvite',
    driverById: '/api/v1/users/drivers/:driverId',
    searchDrivers: '/api/v1/carriers/:carrierId/drivers/:searchTerm',
    deactivateDriverById: '/api/v1/carriers/:carrierId/drivers/:driverId/deactivate',
    deactivateUserById: '/api/v1/users/:userId/deactivate',
    drivers: '/api/v1/carriers/:carrierId/drivers',
    driver: '/api/v1/users/drivers',
    loadById: '/api/v1/loads/:loadId/details',
    language: '/api/v1/preferredLanguages',
    location: '/api/v1/location',
    timeZones: '/api/v1/timezones',
    loadsNeedingAction: '/api/v1/carriers/:carrierId/loads/needsAction',
    multiStopLoads: '/api/v1/carriers/:carrierId/loads/upcomingMultiStop',
    assignDriverByLoadId: '/api/v1/loads/:loadId/assign/:userId',
    unassignDriverByLoadId: '/api/v1/loads/:loadId/unassign',
    itemsByLoadGuid: '/api/v1/loads/:loadGuid/items',
    reassignDriverByLoadId: '/api/v1/loads/:loadId/reassign/:userId',
    unassignedDriversByLoadId: '/api/v1/carriers/:carrierId/loads/:loadId/unassignedDrivers',
    driverStatusByLoadId: '/api/v1/loads/:loadId/driver/:userId/status',
    reportEmptyByLoadGuid: '/api/v1/loads/:loadGuid/reportEmpty',
    reportLoadedByLoadGuid: '/api/v1/loads/:loadGuid/reportLoaded',
    reportDeliveredByLoadGuid: '/api/v1/loads/:loadGuid/reportDelivered',
    feedbackByLoadGuid: '/api/v1/loads/:loadGuid/feedback',
    activityLogByLoadId: '/api/v1/loads/:loadId/activity',
    reportArrivalByLoadGuid: '/api/v1/loads/:loadGuid/reportArrival',
    loadUpdateOptionsByLoadGuid: '/api/v1/loads/:loadGuid/loadUpdateOptions',
    reportLocation: '/api/v1/loads/:loadGuid/reportLocation',
    reportTrailerByLoadGuid: '/api/v1/loads/:loadGuid/reportTrailer',
    proNumberByLoadId: '/api/v1/loads/:loadId/proNumber',
    trailerNumberByLoadId: '/api/v1/loads/:loadId/trailerNumber',
    equipmentByLoadId: '/api/v1/loads/:loadId/equipments',
    verifyDriverByPhone: '/api/v1/carriers/:carrierId/drivers/verify/:phoneNumber',
    mapPointsForActiveLoads: '/api/v1/carriers/:carrierId/loads/active/map',
    mapPointByLoadGuid: '/api/v1/loads/:loadGuid/details/map',
    mapPointsForLoadsNeedingAction: '/api/v1/carriers/:carrierId/loads/needsAction/map',
    activeLoadsPage: '/api/v1/carriers/:carrierId/loads/activeLoadsPage',
    loadDashboard: '/api/v1/carriers/:carrierId/loads/dashboardPage',
    documentUpload: '/api/v1/carriers/:carrierId/documents/loadDocument',
    invoiceUpload: '/api/v1/carriers/:carrierId/documents/invoiceDocument',
    documents: '/api/v1/carriers/:carrierId/documents/:loadId/manifestbyload',
    documentById: '/api/v1/carriers/:carrierId/documents/images/:documentId',
    documentsByIdThumbnail: '/api/v1/carriers/:carrierId/documents/images/:documentId/thumbnail',
    documentsByIdPDF: '/api/v1/carriers/:carrierId/documents/download/pdf/:documentName',
    activeInvoicesPage: '/api/v1/carriers/:carrierId/invoices/activeInvoicesPage',
    invoicesSearch: '/api/v1/carriers/:carrierId/invoices/search',
    archivedInvoicesPage: '/api/v1/carriers/:carrierId/invoices/archivedInvoicesPage',
    invoiceCount: '/api/v1/carriers/:carrierId/invoices/invoiceCount',
    invoiceDetails: '/api/v1/loads/:loadId/invoiceDetails'
  }
};
