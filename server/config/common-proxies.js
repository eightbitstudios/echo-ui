var _ = require('lodash');

module.exports = {
  /**
   * Proxy that matches any API endpoint of the form /rest/.
   *
   * @param  {string} proxyHost - The endpoint to proxy to.
   *
   * @returns {Object} A proxy object.
   */
  api: function(proxyHost) {
    return this._generic(proxyHost, ['^(\/)+api\/.+'], 'Proxies any API path along /api/');
  },

  /**
   * Proxy that matches any API endpoint that the passed in regular expressions match.
   *
   * @param {string} proxyHost   - The endpoint to proxy to.
   * @param {Regex[]} regexes    - The regexes to match against.
   * @returns {Object}             A proxy object.
   */
  mock: function(proxyHost, regexes) {
    return this._generic(proxyHost, regexes, 'Proxies API paths for mocks');
  },

  /**
   * Basic fallback proxy that will match if no other proxy's regex matches the current API endpoint.
   * This proxy is expected to be the last in an environment's proxy array.
   *
   * @param {number} port - Port of the proxy API.
   *
   * @returns {Object} A proxy object.
   */
  localhost: function(port) {
    var matchAnythingRegEx = '[^]*';
    return this._generic('http://localhost:' + port, [matchAnythingRegEx], 'Default Fallback that proxies everything');
  },

  /**
   * Generic proxy that makes no assumptions about what and where to proxy.
   *
   * @example
   *   generic('http://localhost', ['^(\/)+rest\/.+'], 'Proxies any API path along /rest/');
   *
   * @param {string} proxyHost   - The API to proxy to.
   * @param {Regex[]} regexes    - A collection of string regexes to apply against an API endpoint.
   * @param {string} description - A brief note as to what this proxy does.
   *
   * @private
   *
   * @returns {Object} A proxy object.
   */
  _generic: function(proxyHost, regexes, description) {
    var matchNothingRegEx = '^$';
    regexes = (_.some(regexes)) ? regexes : [matchNothingRegEx];
    description = description || 'Proxies anything along\n' + regexes.join('\n');
    description += '\n  to ' + proxyHost;

    return {
      description: description,
      target: proxyHost,
      matcher: function (req, callback) {
        var match = false;

        _.some(regexes, function(regex) {
          var matchingRoutesRegEx = new RegExp(regex);
          match = matchingRoutesRegEx.test(req.url);

//          console.log('========================================');
//          console.log('description = ' + description);
//          console.log('regex = ' + regex);
//          console.log('req.url = ' + req.url);
//          console.log('match = ' + match);

          return match;
        });

        callback(match);
      }
    };
  }
};
