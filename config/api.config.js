/**
 * @description Used by grunt serve to inject the correct url into env-vars.config.js based on the environment.
 * @example grunt serve:local uses https://api.local
 */
module.exports = {
  mocks: {
    url: null
  },
  local: {
    url: 'https://api.local'
  },
  dev: {
    url: 'http://carrierportal.dev.echogl.net:81'
  }
};