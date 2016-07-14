var _ = require('lodash');

var env = process.env.NODE_ENV || 'dev';
var _ = require('lodash');
var commonProxies = require('./common-proxies');
var proxyTypes = require('./proxy-types');

var envConfig = require('./env/' + env);

var proxyType = process.env.PROXY_TYPE || proxyTypes.mixed;
var server = envConfig.server;

var httpPort = process.env.PORT || server.httpPort;
var appPort = process.env.APP_PORT || server.appPort;
var mockApiEndPoint = envConfig.mockApiEndPoint;
var analyticsSrc = server.analyticsSrc;
var analyticsEnv = server.analyticsEnv;
var debuggingEnabled = server.debuggingEnabled;
var isAws = !!process.env.EC2_HOME;
var staticFolders = server.staticFolders;
var proxies = [];
var defaultApiEndpoint = '';

/**
 * Assembles an error message detailing possible reasons why a port number isn't found.
 *
 * @param  {string} listener       What should be listening on a port.
 * @param  {string} envVar         The environment variable associated with the port.
 * @param  {string} envObjProperty The specific port property on the environment configuration object.
 * @param  {string} server   The server config file to use as specified in deploy/config/{env}.
 * @return {string}                An error message with possible solutions.
 */
var createPortErrorMsg = function(listener, envVar, envObjProperty, server) {
  return '\nNo ' + listener + ' port configured.' +
         '\nEnsure that either the ' + envVar.toUpperCase() + ' environment variable ' +
         'or ' + envObjProperty + ' property on the ' + server + ' server configuration object ' +
         '(located: server/config/env/' + server + '.js) has been set.';
};

if (!httpPort) {
  throw createPortErrorMsg('HTTP', 'PORT', 'httpPort', envConfig.server);
}

if (!appPort) {
  throw createPortErrorMsg('APP', 'APP_PORT', 'appPort', envConfig.server);
}

// NOTE: For now, to simplify configuration, if the mock API endpoint is localhost, use the appPort.
if (~envConfig.mockApiEndPoint.indexOf('localhost')) {
  mockApiEndPoint += ':' + appPort;
}

switch (proxyType) {
  case proxyTypes.live:
    defaultApiEndpoint = envConfig.liveApiEndPoint;

    proxies.push(commonProxies.api(envConfig.liveApiEndPoint));
    proxies.push(commonProxies.localhost(appPort));
    break;
  case proxyTypes.mocks:
    defaultApiEndpoint = mockApiEndPoint;

    proxies.push(commonProxies.api(mockApiEndPoint));
    proxies.push(commonProxies.localhost(appPort));
    break;
  case proxyTypes.mixed:
    defaultApiEndpoint = envConfig.liveApiEndPoint;
    proxies.push(commonProxies.mock(mockApiEndPoint, envConfig.mockRegexes));
    proxies.push(commonProxies.api(envConfig.liveApiEndPoint));
    proxies.push(commonProxies.localhost(appPort));
    break;
}

console.log('\n\nLoading environment configuration: \
            \nenv = %s \
            \nproxyType = %s \
            \nappPort = %s \
            \nhttpPort = %s \
            \ndefaultApiEndPoint = %s \
            \ndebuggingEnabled = %s\n', env, proxyType, appPort, httpPort, defaultApiEndpoint, debuggingEnabled);

var config = {
  server: {
    httpPort: httpPort,
    appPort: appPort,
    proxyType: proxyType,
    debuggingEnabled: debuggingEnabled,
    staticFolders: staticFolders
  },
  analyticsSrc: analyticsSrc,
  analyticsEnv: analyticsEnv,
  defaultApiEndpoint: defaultApiEndpoint,
  proxies: proxies
};

console.log('Loading configurations for %s environment.', env);

module.exports = config;