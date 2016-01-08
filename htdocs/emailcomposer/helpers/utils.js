/**
 * Your utility library for express
 */

var basicAuth = require('basic-auth');

/**
 * Simple basic auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', utils.basicAuth('username', 'password'));
 *
 * @param   {string}   username Expected username
 * @param   {string}   password Expected password
 * @returns {function} Express 4 middleware requiring the given credentials
 */
exports.basicAuth = function(bool) {
  console.log('bool');
  console.log(bool);
  if (bool) {
    console.log("exx");
    return function(req, res, next) {
      var user = basicAuth(req);
      console.log('user : ');
      console.log(user);
      if (!user || user.name !== 'user' || user.pass !== 'pass') {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
      }
      next();

    };
  };
};
