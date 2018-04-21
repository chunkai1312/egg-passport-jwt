'use strict';

const debug = require('debug')('egg-passport-jwt');
const assert = require('assert');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = app => {
  const config = app.config.passportJwt;
  config.passReqToCallback = true;
  config.jwtFromRequest = config.jwtFromRequest || ExtractJwt.fromAuthHeaderAsBearerToken();
  assert(config.secret, '[egg-passport-jwt] config.passportJwt.secret required');
  config.secretOrKey = config.secretOrKey || config.secret;

  // must require `req` params
  app.passport.use('jwt', new Strategy(config, (req, payload, done) => {
    // format user
    const user = {
      provider: 'jwt',
      payload,
    };

    debug('%s %s get user: %j', req.method, req.url, user);

    // let passport do verify and call verify hook
    app.passport.doVerify(req, user, done);
  }));
};
