module.exports = {
  server: {
    httpPort: 9000,
    httpsPort: 9443,
    appPort: 9080,
    staticFolders: ['build/public'],
  },
  liveApiEndPoint: 'https://api.local',
  mockApiEndPoint: 'http://localhost',
  mockRegexes: ['/api/v1/user/*'],
  name: 'dev'
};
